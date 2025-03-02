import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const pages = [
  {
    title: 'Welcome to Valv',
    description: 'Experience the future of campus life with Valv, your AI-powered gateway to all the resources and support you need to thrive.',
    image: require('../assets/images/image2.png'), 
  },
  {
    title: 'Find Your Community',
    description: 'Connect with fellow students, join study groups, and participate in campus events to build your community.',
    image: require('../assets/images/image3.png'), 
  },
  {
    title: 'Get Support',
    description: 'Access mental health support, career services, and other essential resources to help you succeed.',
    image: require('../assets/images/image1.png'), 
  },
];

export default function Info() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage < pages.length - 1) {
        handleNext();
      } else {
        clearInterval(interval);
        router.push('/login');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (currentPage + 1) / pages.length,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current.scrollTo({ x: width * (currentPage + 1), animated: true });
      setCurrentPage(currentPage + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '93%']
      }) }]} />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        scrollEnabled={false}
        ref={scrollViewRef}
      >
        {pages.map((page, index) => (
          <View key={index} style={[styles.page, { width }]}>
            <Text style={styles.title}>{page.title}</Text>
            <Image source={page.image} style={styles.image} />
            <Text style={styles.description}>{page.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.progressContainer}>
        {pages.map((_, i) => (
          <View key={i} style={[styles.progressDot, currentPage === i ? styles.activeDot : null]} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentPage < pages.length - 1 ? 'Next' : 'Get Started'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#1e90ff',
  },
  progressBar: {
    top: 50,
    height: 3,
    borderRadius: 20,
    backgroundColor: '#227E75',
    marginBottom: 60,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: height * 0.6, // Adjust height to fit the screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 110,
    bottom: 45,

  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    top: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#227E75',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  skipButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
