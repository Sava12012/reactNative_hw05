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
import { styles } from "./Registration.styles";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Add from "../../../assets/images/add.svg";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [focusLogin, setFocusLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [focusEmail, setIsFocusEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);

      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const loginSave = (login) => setLogin(login);
  const emailSave = (email) => setEmail(email);
  const passwordSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`Усі поля мають бути заповнені!`);
      return;
    }
    Alert.alert(`${login}, успішно зареєстровані!`);
    console.log("login" - login, "email" - email, "password" - password);
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };

  const keyboardIsHidden = () => {
    Keyboard.dismiss();
  };

  const [fonts] = useFonts({
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
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
            style={styles.backgroundImg}
            source={require("../../../assets/images/bgImage.png")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.wrapper,
                  width: phoneWidth,

                  marginTop: phoneWidth > 400 ? 200 : 300,
                }}
              >
                <View
                  style={{
                    ...styles.imageWrap,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addSvg,
                    right: phoneWidth / 2 - 70,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Регістрація</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: focusLogin ? "#FF6C00" : "#E8E8E8",
                    }}
                    onFocus={() => setFocusLogin(true)}
                    onBlur={() => setFocusLogin(false)}
                    value={login}
                    placeholder="Логін"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={loginSave}
                  ></TextInput>
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
                    <Text style={styles.buttonText}>Зареєструватись</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.footer}>
                      Вже є обліковий запис? Увійти
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

export default RegistrationScreen;
