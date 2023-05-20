import { StyleSheet } from "react-native";
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
    justifyContent: "flex-end",

    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 550,
    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  imageWrap: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addSvg: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 25,
    height: 25,
  },
  title: {
    textAlign: "center",

    marginBottom: 30,

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
    fontFamily: "RobotoRegular",

    color: "#212121",
  },
  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 253,
    paddingRight: 16,
  },
  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },

  button: {
    height: 50,
    marginTop: 40,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },
  footer: {
    marginTop: 15,
    marginBottom: 100,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },
});
