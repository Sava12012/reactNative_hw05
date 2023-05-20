import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import DownloadPhoto from "../../assets/images/downloadPhoto.svg";

const CameraScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);
  const [cameraAllow, setCameraAllow] = useState();
  const [libraryAllow, setLibraryAllow] = useState();

  const camera = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Не вдалося визначити місцезнаходження");
      }

      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const libraryPermission = await MediaLibrary.requestPermissionsAsync();
      setCameraAllow(cameraPermission.status === "granted");
      setLibraryAllow(libraryPermission.status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    const newPhoto = await camera.current.takePictureAsync();
    setPhoto(newPhoto.uri);
  };
  console.log(libraryAllow);

  if (photo) {
    const savePhoto = () => {
      navigation.navigate("Створити публікацію", { photo, location });
    };

    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={{ uri: photo }} />
        <View style={styles.buttonContainer}>
          {libraryAllow ? (
            <TouchableOpacity
              style={{ ...styles.button, marginRight: 30 }}
              onPress={savePhoto}
            >
              <Text style={styles.textButton}>Зберегти</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.textButton}>Перезняти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Camera ref={camera} style={styles.camera}>
        <TouchableOpacity style={styles.takeButton} onPress={takePhoto}>
          <DownloadPhoto />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  preview: {
    width: "100%",
    height: "100%",
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 70,
  },
  button: {
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#FF6C00",

    justifyContent: "center",
  },
  textButton: {
    fontSize: 20,

    textAlign: "center",
    color: "#FFFFFF",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  takeButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
});
