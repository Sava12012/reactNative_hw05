import { StyleSheet } from "react-native-web";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    height: 550,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 400,
  },
  title: {
    marginTop: 35,
    marginBottom: 30,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "RobotoBold",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto",

    color: "#212121",
  },
  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 265,
    paddingRight: 16,
  },
  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto",
  },

  button: {
    height: 50,
    marginTop: 43,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },
  footer: {
    marginTop: 16,
    marginBottom: 110,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto",
  },
});
