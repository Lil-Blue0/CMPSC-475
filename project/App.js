import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

// Helper to fetch data from the Sefaria API
const getSefariaData = async (endpoint) => {
  const response = await fetch(`https://www.sefaria.org/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export default function App() {
  // State for all our data
  const [parashaName, setParashaName] = useState('');
  const [hebrewVerse, setHebrewVerse] = useState({ text: '', title: '' });
  const [englishVerse, setEnglishVerse] = useState({ text: '', title: '' });
  const [commentaries, setCommentaries] = useState([]);
  
  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParashaData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Get Parasha from Calendar API
        const calendarData = await getSefariaData('api/calendars');
        const parashaItem = calendarData.calendar_items.find(
          (item) => item.title.en === 'Parashat Hashavua'
        );

        if (!parashaItem) {
          throw new Error('Parashat Hashavua not found in calendar data.');
        }

        setParashaName(parashaItem.displayValue.en);
        const verseRef = parashaItem.ref.split('-')[0];

        // 2. Get Verse Text (Hebrew and English) and Related Commentaries
        const [hebrewData, englishData, relatedData] = await Promise.all([
          getSefariaData(`api/v3/texts/${verseRef}`),
          getSefariaData(`api/v3/texts/${verseRef}?version=english`),
          getSefariaData(`api/related/${verseRef}`),
        ]);

        setHebrewVerse({
          text: hebrewData.versions[0]?.text || 'N/A',
          title: hebrewData.versions[0]?.versionTitle || 'N/A',
        });

        setEnglishVerse({
          text: englishData.versions[0]?.text || 'N/A',
          title: englishData.versions[0]?.versionTitle || 'N/A',
        });

        // 3. Filter for commentary links
        const commentaryRefs = relatedData.links
          .filter((link) => link.type === 'commentary')
          .slice(0, 3) // Get the first 3
          .map((link) => link.ref);

        // 4. Fetch each commentary's text
        const commentaryPromises = commentaryRefs.map(ref => getSefariaData(`api/v3/texts/${ref}`));
        const commentaryResults = await Promise.all(commentaryPromises);

        const fetchedCommentaries = commentaryResults.map(data => ({
          title: data.title || 'Unknown Commentary',
          text: data.versions[0]?.text.join(' ') || 'Text not available.',
        }));
        setCommentaries(fetchedCommentaries);

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParashaData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading Parasha Data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>An error occurred:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Outline for Parashat {parashaName}</Text>
      
      <View style={styles.verseContainer}>
        <Text style={styles.verseText}>Hebrew: {hebrewVerse.text} (edition: {hebrewVerse.title})</Text>
        <Text style={styles.verseText}>English: {englishVerse.text} (edition: {englishVerse.title})</Text>
      </View>

      <Text style={styles.subheader}>Three Commentaries:</Text>
      
      {commentaries.map((commentary, index) => (
        <View key={index} style={styles.commentaryContainer}>
          <Text style={styles.commentaryTitle}>{`${String.fromCharCode(65 + index)}) ${commentary.title}`}</Text>
          <Text>{commentary.text}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  verseContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  verseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  commentaryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  commentaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  }
});
