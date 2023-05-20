import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Camera } from "expo-camera";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import Location from "../../assets/images/postImg/location.svg";
import AddPhoto from "../../assets/images/addPhoto.svg";
import Delete from "../../assets/images/trash.svg";

import { postsScreenArray } from "./../../data/posts";

export const CreatePostsScreen = ({ navigation, route }) => {
  const [fonts] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [title, setTitle] = useState("");
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);

  const [location, setLocation] = useState("");
  const [isFocusedLocation, setIsFocusedLocation] = useState(false);

  const [isDisabledPublish, setIsDisabledPublish] = useState(true);
  const [isDelete, setIsDelete] = useState(true);

  const [image, setImage] = useState("");

  const titleHandler = (title) => setTitle(title);

  const onPublish = () => {
    if (!title.trim() || !location) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    Alert.alert(`Ваша публікація пройшла успішно`);

    const newPost = {
      id: Date(),
      img: image,
      title: title,
      location: `${location?.latitude}, ${location?.longitude}`,
      comments: 35,
      likes: 112,
    };

    setTitle("");
    setLocation("");
    setImage();
    Keyboard.dismiss();
    navigation.navigate("Публікації", { newPost });
  };

  const onDelete = () => {
    setTitle("");
    setLocation("");
    setImage();
    Alert.alert(`Вилучення пройшло успішно`);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (route.params) {
      setImage(route.params.photo);
      setLocation(route.params.location);
    }
  }, [route.params]);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    title && location && image
      ? setIsDisabledPublish(false)
      : setIsDisabledPublish(true);
  }, [title, location, image]);

  useEffect(() => {
    title || location || image ? setIsDelete(false) : setIsDelete(true);
  }, [title, location, image]);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);
  if (!fonts) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View style={{ ...styles.section, width: windowWidth }}>
          {image ? (
            <View>
              <Image
                style={{ ...styles.image, width: windowWidth - 32 }}
                source={{ uri: image }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 90,
                  left: (windowWidth - 60 - 32) / 2,
                }}
              >
                <AddPhoto
                  onPress={() => navigation.navigate("Камера")}
                  opacity={0.3}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ ...styles.noPhoto, width: windowWidth - 16 * 2 }}>
              <TouchableOpacity>
                <AddPhoto onPress={() => navigation.navigate("Камера")} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.contantTitle}>
            <Text style={styles.text}>Завантажте фото</Text>
          </View>
          <View style={{ width: windowWidth - 32 }}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedTitle ? "#FF6C00" : "#E8E8E8",
              }}
              onFocus={() => setIsFocusedTitle(true)}
              onBlur={() => setIsFocusedTitle(false)}
              value={title}
              placeholder="Назва..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={titleHandler}
            ></TextInput>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocusedLocation ? "#FF6C00" : "#E8E8E8",
                paddingLeft: 25,
              }}
              onFocus={() => setIsFocusedLocation(true)}
              onBlur={() => setIsFocusedLocation(false)}
              value={
                location ? `${location?.latitude}, ${location?.longitude}` : ""
              }
              textContentType={"location"}
              placeholder="Місцевість..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
            ></TextInput>
            <Location
              style={styles.locationIcon}
              onPress={() =>
                navigation.navigate("Мапа", {
                  location,
                })
              }
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.button,
              width: windowWidth - 32,
              backgroundColor: isDisabledPublish ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={onPublish}
          >
            <Text
              style={{
                ...styles.textButton,
                color: isDisabledPublish ? "#BDBDBD" : "#FFFFFF",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.deleteImg,
              backgroundColor: isDelete ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={onDelete}
          >
            <Delete stroke={isDelete ? "#BDBDBD" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  section: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 16,
  },
  noPhoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  contentSection: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  image: {
    height: 240,

    resizeMode: "cover",
    borderRadius: 8,
  },
  contantTitle: {
    width: "100%",

    lignItems: "flex-start",
  },
  text: {
    marginTop: 8,
    marginBottom: 16,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto",
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
  button: {
    height: 40,
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  deleteImg: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});
