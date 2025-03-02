import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI("AIzaSyABYvIRAVuehwP6Ur5mGMzbybagotV8RlA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// resources
const resources = [
  { id: '1', name: 'Library', description: 'Access books, journals, and study spaces.' },
  { id: '2', name: 'Counseling Center', description: 'Get support for mental health and well-being.' },
  { id: '3', name: 'Career Services', description: 'Find internships, jobs, and career advice.' },
  // more campus resources...
];

// question prompts
const questionPrompts = [
  'Tell me about the Library',
  'What services does the Counseling Center offer?',
  'How can Career Services help me?',
  'Map me to the Library',
  'Where is the Counseling Center?',
  //more question prompts...
];

export default function AboutScreen() {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle sending a message
  const handleSend = async (message?: string) => {
    const userInput = message || input;
    if (userInput.trim()) {
      const userMessage: { id: string; text: string; sender: 'user' | 'bot' } = { id: Date.now().toString(), text: userInput, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setShowPrompts(false);
      setShowPlaceholder(false);

      // Simulate Valv-AI response with typing effect
      setTimeout(async () => {
        const resource = resources.find(res => userInput.toLowerCase().includes(res.name.toLowerCase()));
        let botMessage = resource ? `${resource.name}: ${resource.description}` : '';

        if (!botMessage) {
          const result = await model.generateContent(userInput);
          botMessage = result.response.text() ?? '';
        }

        let index = 0;
        typingIntervalRef.current = setInterval(() => {
          setTypingMessage(botMessage.slice(0, index + 1));
          index++;
          if (index === botMessage.length) {
            clearInterval(typingIntervalRef.current!);
            typingIntervalRef.current = null;
            const finalBotMessage: { id: string; text: string; sender: 'user' | 'bot' } = { id: Date.now().toString(), text: botMessage, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, finalBotMessage]);
            setTypingMessage('');
          }
        }, 50);
      }, 1000);
    }
  };

  // Handle refreshing the chat
  const onRefresh = () => {
    setRefreshing(true);
    setMessages([]);
    setTypingMessage('');
    setInput('');
    setShowPrompts(true);
    setShowPlaceholder(true);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  // Scroll to the end of the chat when messages or typingMessage change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingMessage]);

  // Play audio for the Valv-AI message
  const playAudio = (text: string) => {
    Speech.speak(text);
  };

  // Render a chat message
  const renderItem = ({ item }: { item: { id: string; text: string; sender: 'user' | 'bot' } }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      {item.sender === 'bot' && (
        <TouchableOpacity onPress={() => playAudio(item.text)} style={styles.microphoneButton}>
          <Ionicons name="mic-outline" size={24} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Valv</Text>
      </View>
      {showPlaceholder && messages.length === 0 && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>What do you need help with?</Text>
        </View>
      )}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.chat}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {typingMessage ? (
        <View style={[styles.message, styles.botMessage]}>
          <Text style={styles.messageText}>{typingMessage}</Text>
          <TouchableOpacity onPress={() => playAudio(typingMessage)} style={styles.microphoneButton}>
            <Ionicons name="mic-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="scan-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: input.trim() ? '#1e90ff' : '#555' }]}
          onPress={() => handleSend()}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      {showPrompts && (
        <ScrollView horizontal style={styles.promptContainer} showsHorizontalScrollIndicator={false}>
          {questionPrompts.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptButton} onPress={() => handleSend(prompt)}>
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

// Styling Container - CSS instead of Tailwind...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60, 
    backgroundColor: '#f1f1f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -10 }],
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
  },
  chat: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#183C4C',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    flex: 1,
  },
  microphoneButton: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3e3e3e',
    color: '#000',
  },
  sendButton: {
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  promptContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    flexDirection: 'row',
  },
  promptButton: {
    backgroundColor: '#3e3e3e',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  promptText: {
    color: '#fff',
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
