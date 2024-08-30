import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';

// Function to extract YouTube video ID from URL
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to get YouTube thumbnail URL
const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

const Cultivation = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const renderYouTubeLink = (url, title) => {
    const videoId = extractVideoId(url);
    const thumbnailUrl = videoId ? getThumbnailUrl(videoId) : null;

    return (
      <TouchableOpacity onPress={() => openLink(url)} style={styles.linkContainer}>
        {thumbnailUrl ? (
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        ) : (
          <Text>No thumbnail available</Text>
        )}
        <Text style={styles.linkText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const renderResourceLink = (url, title, thumbnail) => (
    <TouchableOpacity onPress={() => openLink(url)} style={styles.linkContainer}>
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      ) : (
        <Text>No thumbnail available</Text>
      )}
      <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cultivation Process</Text>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.text}>
          Cultivation is the process of preparing the land and growing crops. It's crucial for
          ensuring healthy and high-yielding crops.
        </Text>
      </View>

      {/* Step-by-Step Guide */}
      <View style={styles.section}>
        <Text style={styles.heading}>Step-by-Step Guide</Text>
        <Text style={styles.subheading}>1. Soil Preparation</Text>
        <Image source={require('../assets/cul-2.jpeg')} style={styles.image} />
        <Text style={styles.text}>
          Begin by preparing the soil through plowing and fertilization. Proper soil preparation
          ensures the seeds get the nutrients they need.
        </Text>

        {/* Continue adding more steps here */}
        <Text style={styles.subheading}>2. Seed Selection</Text>
        <Text style={styles.text}>Choose the right seeds based on your soil and climate conditions.</Text>
        {/* Add more content as needed */}
      </View>

      {/* Tips and Best Practices */}
      <View style={styles.section}>
        <Text style={styles.heading}>Tips and Best Practices</Text>
        <Text style={styles.text}>Always monitor your crops closely and adjust your practices as needed.</Text>
      </View>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.heading}>Resources</Text>

        {/* Articles */}
        <Text style={styles.subheading}>Articles</Text>
        {renderResourceLink(
          'https://www.agriculture.com/farming/basics-of-crop-cultivation',
          'The Basics of Crop Cultivation',
          'https://example.com/article-thumbnail1.jpg' // Replace with actual thumbnail URL
        )}
        {renderResourceLink(
          'https://www.fao.org/agriculture/cropcultivationguide',
          'Guide to Successful Crop Cultivation',
          'https://example.com/article-thumbnail2.jpg' // Replace with actual thumbnail URL
        )}
        {renderResourceLink(
          'https://www.nrcs.usda.gov/soil-health-importance-in-cultivation',
          'Soil Health and Its Importance in Crop Cultivation',
          'https://example.com/article-thumbnail3.jpg' // Replace with actual thumbnail URL
        )}

        {/* YouTube Videos */}
        <Text style={styles.subheading}>YouTube Videos</Text>
        {renderYouTubeLink('https://youtu.be/fRPoXecfV3s?si=6ajUyzm7B0xp0va4', 'Profitable Vegetable Farming For A Beginner SMALL Farmer- Least Effort')}
        {renderYouTubeLink('https://youtu.be/O0iQbCf-A_M?si=8nIC3khhCj9YNRca', 'VEGETABLE FARMING HANDBOOK | how to do Organic farming | Vegetable Business')}
        {renderYouTubeLink('https://youtu.be/Xej22GsLLQA?si=m5DOQxZdUMAQ4bVb', 'Drip Irrigation System | How It Works ')}

        {/* YouTube Playlist */}
        <Text style={styles.subheading}>YouTube Playlist</Text>
        <TouchableOpacity onPress={() => openLink('https://youtube.com/playlist?list=PLWPirh4EWFpEiba_oED9yYUi_oNZSvO1S&si=SY7EgcDLLxMWxv1M')}>
          <Image
            source={{ uri: 'https://i.ytimg.com/vi/xOk2gdG9iaU/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDg6NEn1t1SbKQ4gf1ljdya9gcKrQ' }} // Replace with actual playlist thumbnail
            style={styles.thumbnail}
          />
          <Text style={styles.linkText}>Cultivation of Crops TutorialsPoint · Playlist
</Text>
        </TouchableOpacity>

        {/* Websites */}
        <Text style={styles.subheading}>Websites</Text>
        {renderResourceLink(
          'https://www.fao.org/home/en',
          'FAO - Food and Agriculture Organization',
          'https://example.com/website-thumbnail1.jpg' // Replace with actual thumbnail URL
        )}
        {renderResourceLink(
          'https://www.growveg.com/',
          'GrowVeg',
          'https://example.com/website-thumbnail2.jpg' // Replace with actual thumbnail URL
        )}
        {renderResourceLink(
          'https://www.agrifarming.in/',
          'AgriFarming',
          'https://example.com/website-thumbnail3.jpg' // Replace with actual thumbnail URL
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20 ,
    color: '#43B76A',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkContainer: {
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
});

export default Cultivation;
