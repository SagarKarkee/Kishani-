import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedback, setFeedback] = useState("");

  const tags = [
    "Quick delivery",
    "Damaged",
    // "Inconsistent quality",
    "Fresh",
    "Well-Packaged",
    "On-time delivery",
    "Pricing",

  ];

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // const handleSubmit = () => {
  //   // Submit feedback logic
  //   console.log("Rating:", rating);
  //   console.log("Selected Tags:", selectedTags);
  //   console.log("Detailed Feedback:", feedback);
  //   alert("Feedback submitted successfully!");
  // };
  const handleSubmit = () => {
    // Display an alert and navigate to the Home screen after
    Alert.alert("Feedback Submitted", "Thank you for your feedback!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("BDashboard"),
      },
    ]);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports And Feedback</Text>

      {/* Rating Section */}
      <Text style={styles.subHeader}>Rate Your Experience</Text>
      <Text>Are you satisfied with the service?</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <FontAwesome
              name={rating >= star ? "star" : "star-o"}
              size={30}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Improvement Tags Section */}
      <Text style={styles.subHeader}>Tell us what can be improved?</Text>
      <FlatList
        data={tags}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tag,
              selectedTags.includes(item) && styles.tagSelected,
            ]}
            onPress={() => toggleTag(item)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(item) && styles.tagTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Feedback Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Tell us how we can improve"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 35,
    // display: ,
    marginLeft: 35,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  starButton: {
    marginHorizontal: 4,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginLeft: -2,
  },
  tagSelected: {
    backgroundColor: "#4CAF50",
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  tagTextSelected: {
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 16,
  
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackScreen;
