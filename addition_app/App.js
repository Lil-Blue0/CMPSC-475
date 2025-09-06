import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from "react-native";


export default function App() {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);
  
  
  const handleAdd = () => {
      setResult((parseInt(a) || 0) + (parseInt(b) || 0));
    };

  const handleReset = () => {
    setA(0);
    setB(0);
    setResult(0);
  }

  return (
  <View style={styles.container}>

      <Text style={{ textAlign: "center", fontSize: 24, marginTop: 20}}>Addition App!</Text>


    <View style={{ flex:1, padding:16, justifyContent:"center" }}>


      <View style={styles.calculatorbox}>
    
        <TextInput
        style={styles.input} placeholder="0" keyboardType="numeric" inputMode="numeric" onChangeText={setA} value={a}
        ></TextInput>
  
        <Text style={{fontSize: 45}}> + </Text>
    
        <TextInput
        style={styles.input} placeholder="0" keyboardType= "numeric" inputMode="numeric" onChangeText={setB} value={b}
        ></TextInput>
  
        <Text style={{fontSize: 45}}> = {result} </Text>


      </View>

    </View>
    <View style={{ height:125, backgroundColor:'black', justifyContent:'center', paddingHorizontal:16 , paddingBottom:8, gap: 10}}>
      <Button style={styles.button} title="Calculate" onPress={handleAdd}/>
      <Button style={styles.button} title="Reset" onPress={handleReset}/>
    
    </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f3c9ff",
  },
  input: {
    color: "#000000",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    width: 80,
    height: 80,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 32,
  },
  calculatorbox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
