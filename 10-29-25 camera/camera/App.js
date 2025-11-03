import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);
  const [barcodeData, setBarcodeData] = useState(null);

  const flipCamera = () => {
    setFacing((facing) => (facing === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  const handleBarcodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setBarcodeData({ type, data });
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        style={{ flex: 1 }}
        onCameraReady={() => console.log("Its ready")}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "code39",
            "code128",
            "upc_a",
            "upc_e",
            "pdf417",
            "code93",
            "codabar",
            "datamatrix",
            "aztec",
            "itf14",
          ],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={{ position: "absolute", top: 50, left: 20, right: 20 }}>
        {barcodeData && (
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            Scanned {barcodeData.type} : {barcodeData.data}
          </Text>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          gap: 2,
          paddingHorizontal: 20,
        }}
      >
        <Button title="Flip Camera" onPress={flipCamera} />
        <Button title="Take Picture" onPress={takePicture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
