import React, { useState, useEffect, useCallback } from "react";
import {
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";

import { styles } from "./LoginScreen.styles";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeidth, setPhoneHeidth] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);
      const height = Dimensions.get("window").height;
      setPhoneHeidth(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const emailSave = (email) => setEmail(email);
  const passwordSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    Alert.alert(`${email}, успішно увійшли!`);
    console.log("email" - email, "password" - password);

    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };

  const keyboardIsHidden = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fonts] = useFonts({
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    Roboto: require("../../../assets/fonts/Roboto-Regular.ttf"),
  });

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
      <TouchableWithoutFeedback onPress={keyboardIsHidden}>
        <View style={styles.containerFlex}>
          <ImageBackground
            style={{
              ...styles.backgroundImg,
              width: phoneWidth,
              height: phoneHeidth,
            }}
            source={require("../../../assets/images/bgImage.png")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.wrapper,
                  width: phoneWidth,
                }}
              >
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Увійти</Text>

                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusEmail ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => setIsFocusEmail(false)}
                    value={email}
                    placeholder="Адреса електронної пошти"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusPassword ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    value={password}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwordSave}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.textButton}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.footer}>
                      Немає облікового запису? Зареєструватись
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
