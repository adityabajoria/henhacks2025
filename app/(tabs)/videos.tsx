import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

// Our Campus video data
const videos = [
  { id: '1', title: 'HenHacks - 2025', videoUri: require('../../assets/videos/HenHacks.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '2', title: 'Black History Month', videoUri: require('../../assets/videos/BHM.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '3', title: 'Event Highlights', videoUri: require('../../assets/videos/library.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '4', title: 'UD experience - Tell us Yours', videoUri: require('../../assets/videos/UDexperience.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '5', title: 'Health Center Overview', videoUri: require('../../assets/videos/UDhealth.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '6', title: 'Clubs and Organizations', videoUri: require('../../assets/videos/events.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '7', title: 'Career Services', videoUri: require('../../assets/videos/UDcareer.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '8', title: 'Campus Events', videoUri: require('../../assets/videos/UD.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '9', title: 'Student Life', videoUri: require('../../assets/videos/Studentlife.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '10', title: 'Food Options', videoUri: require('../../assets/videos/dinning.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '11', title: 'Sports Facilities', videoUri: require('../../assets/videos/Sport.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '12', title: 'Research Opportunities', videoUri: require('../../assets/videos/UDresearch.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '13', title: 'Reuse Pass', videoUri: require('../../assets/videos/reusepass.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '14', title: 'Study Abroad', videoUri: require('../../assets/videos/Studyabroad.mp4'), thumbnail: require('../../assets/images/UD.png') },
  { id: '15', title: 'Udairy', videoUri: require('../../assets/videos/Udairy.mp4'), thumbnail: require('../../assets/images/UD.png') },
  // more campus resource videos can be added here...
];

export default function Videos() {
  const videoRefs = useRef<(Video | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Handle viewable items change to play/pause videos.
   */
  const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== null) {
        setCurrentIndex(index);
        videoRefs.current.forEach((video, idx) => {
          if (video) {
            if (idx === index) {
              video.playAsync();
            } else {
              video.stopAsync();
            }
          }
        });
      }
    }
  }).current;

  /**
   * Render each video item.
   * @param {Object} param0 - Object containing item and index.
   * @param {Object} param0.item - Video item.
   * @param {number} param0.index - Index of the video item.
   * @returns Rendered video item.
   */
  const renderItem = ({ item, index }: { item: typeof videos[0], index: number }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => {
          const video = videoRefs.current[index];
          if (video) {
            video.getStatusAsync().then(status => {
              if (status.isLoaded && status.isPlaying) {
                video.pauseAsync();
              } else {
                video.playAsync();
              }
            });
          }
        }}
      >
        <Video
          ref={ref => (videoRefs.current[index] = ref)}
          source={item.videoUri}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={index === currentIndex}
          isLooping
          isMuted={false}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
}

// Styling Container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    width: width,
    height: height,
    position: 'relative',
    marginBottom: -83,
  },
  videoContainer: {
    width: '100%',
    height: '90%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
