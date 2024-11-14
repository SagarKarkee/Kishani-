import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Function to extract YouTube video ID from URL
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to get YouTube thumbnail URL
const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

const Cultivation = () => {
  const navigation = useNavigation();

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

  const renderArticleLink = (url, title) => (
    <TouchableOpacity onPress={() => openLink(url)} style={styles.articleContainer}>
      <MaterialIcons name="article" size={40} color="#43B76A" style={styles.articleIcon} />
      <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderWebsiteLink = (url, title, thumbnail) => (
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
      {/* Back Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

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
        {renderArticleLink(
          'https://www.agriculture.com/farming/basics-of-crop-cultivation',
          'The Basics of Crop Cultivation'
        )}
        {renderArticleLink(
          'https://www.fao.org/agriculture/cropcultivationguide',
          'Guide to Successful Crop Cultivation'
        )}
        {renderArticleLink(
          'https://www.nrcs.usda.gov/soil-health-importance-in-cultivation',
          'Soil Health and Its Importance in Crop Cultivation'
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
          <Text style={styles.linkText}>Cultivation of Crops TutorialsPoint · Playlist</Text>
        </TouchableOpacity>

        {/* Websites */}
        <Text style={styles.subheading}>Websites</Text>
        {renderWebsiteLink(
          'https://www.accessagriculture.org/',
          'Access Agriculture',
          'https://www.accessagriculture.org/sites/default/files/AA%20main%20logo%20no%20URL%20copy.png' // Replace with actual thumbnail URL
        )}
        {renderWebsiteLink(
          'https://www.growveg.com/',
          'GrowVeg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5jAuisZGOsmONrQa7BlkGxd9nPMrkTD4bbA&s' // Replace with actual thumbnail URL
        )}
        {renderWebsiteLink(
          'https://www.agrifarming.in/',
          'AgriFarming',
          'https://lh3.googleusercontent.com/gc2Iae6ydSrao0ICOcTCElZbCtWEEiOnXiTz8srxqOT77jtFmghODPGdaNN8BKOJOOJpqbXg_JYXMygE16sPw3k=h200' // Replace with actual thumbnail URL
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
  backButton: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
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
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  articleIcon: {
    marginRight: 10,
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
