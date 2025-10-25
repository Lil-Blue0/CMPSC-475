import {
   View, 
  Text, 
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {useState} from "react";


export default function Location({
  savedZips,
  getLocFromZip,
  addZipCode,
  navigation,
}) {

  const [zipInput, setZipInput] = useState("");

  const handleAddZip = () => {
    if (zipInput){

      addZipCode(zipInput);
      setZipInput("");
    }
  };

    const handleSelectZip = (zip) => {
      getLocFromZip(zip);
      navigation.navigate("Forecast");
    }

  return (

<View style={styles.container}>
        <Text style={styles.header}>Location Screen</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Zip Code"
            value={zipInput}
            onChangeText={setZipInput}
            keyboardType="number-pad"
            maxLength={5}
          />
          <Button title="Add" onPress={handleAddZip} />
        </View>

        <Text style={styles.subHeader}>Saved Zip Codes:</Text>
       <FlatList
        style={styles.list}
        data={savedZips}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.zipItem}
            onPress={() => handleSelectZip(item)}
          >
            <Text style={styles.zipText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No recent locations saved.</Text>
        }
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  list: {
    width: "100%",
  },
  zipItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  zipText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});