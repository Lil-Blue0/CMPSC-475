import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermissions] =
    MediaLibrary.usePermissions();
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);
  const [barcodeData, setBarcodeData] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const flipCamera = () => {
    setFacing((facing) => (facing === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: false,
        skipProcessing: true,
        soundOnCapture: false,
      });
      console.log(photo);
      if (photo && photo.uri) setCapturedPhoto(photo);
    }
  };

  const savePhoto = async () => {
    if (!capturedPhoto) return;
    try {
      //check for expo go on android
      const isExpoGo = __DEV__ && Platform.OS == "android";
      if (isExpoGo) {
        Alert.alert(
          "Saving photos is not supported in Expo Go on Android. Please build a standalone app to use this feature.",
          [{ text: "Ok", onPress: () => setCapturedPhoto(null) }]
        );
        return;
      }

      if (!mediaLibraryPermission?.granted) {
        const { status } = await requestMediaLibraryPermissions();
        if (status !== "granted") {
          console.log("Media library permission not granted");
          Alert.alert(
            "Permissions required",
            "We need permission to save photos to your gallery."
          );
          return;
        }
      }
      //have perms and don't have to worry about expo go on android.
      const asset = await MediaLibrary.createAssetAsync(capturedPhoto.uri);
      await MediaLibrary.createAlbumAsync("Camera", asset, false);
      console.log("Photo saved to gallery!");
      setCapturedPhoto(null);
    } catch (error) {
      console.log("Error saving photo:", error);
      Alert.alert("Error", "There was an error saving the photo.");
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
      {capturedPhoto ? (
        <ImageBackground
          source={{ uri: capturedPhoto.uri }}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 50,
              paddingHorizontal: 20,
            }}
          >
            <Button title="Save Photo" onPress={savePhoto} />
            <Button title="Discard" onPress={() => setCapturedPhoto(null)} />
          </View>
        </ImageBackground>
      ) : (
        <>
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
        </>
      )}
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
