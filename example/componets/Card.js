import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";

const Card = ({ title, children }) => {
  title = title.toUpperCase();
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  // Main container for the screen
  container: {
    justifyContent: "flex-start", // stack children from the top
    backgroundColor: "#ececec", // light gray background
    paddingTop: 60, // space at the top (useful for header spacing)
    padding: 15, // uniform inner spacing on all sides
    paddingBottom: 60, // extra space at the bottom so content isn’t cut off
  },

  // Card component (white box with shadow & border)
  card: {
    backgroundColor: "#ffffff", // white background for contrast
    marginBottom: 20, // space between cards
    borderColor: "#000000", // black border color
    borderWidth: 2, // border thickness
    borderRadius: 10, // rounded corners
    elevation: 3, // Android shadow effect
    padding: 20, // inner spacing inside the card
    justifyContent: "center", // vertically center child elements
    alignItems: "center", // horizontally center child elements
  },

  // Heading text style (title inside cards)
  heading: {
    marginBottom: 10, // space below heading before body text
    fontSize: 24, // larger text size for emphasis
    color: "#1e205c", // dark blue text color
    fontWeight: "bold", // bold weight for strong emphasis
    textAlign: "center", // center align text horizontally
  },

  // Body text style (paragraphs inside cards)
  body: {
    fontSize: 18, // readable font size
    lineHeight: 24, // increases space between lines for readability
  },

  // Logo image style
  logo: {
    width: 150, // fixed width
    height: 150, // fixed height
    resizeMode: "contain", // scales image proportionally without cropping
  },
});
