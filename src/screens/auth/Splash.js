import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../../assets/logo/logo_white2.png";
import { colors } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  //method to fetch the authUser data from aync storage if there is any and login the Dashboard or Home Screen according to the user type
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("authUser");
      const list = await AsyncStorage.getItem("categoryList");
      if (value !== null) {
        let user = JSON.parse(value); // covert the authUser value to json
        let categoryList = JSON.parse(list); 
        if (user.userType === "ADMIN") {
          setTimeout(() => {
            navigation.replace("dashboard", { authUser: JSON.parse(value), categoryList }); // navigate to Admin dashboard
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.replace("tab", { user: JSON.parse(value), categoryList: categoryList }); // navigate to User Home screen
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace("login"); // // navigate to login screen if there is no authUser store in aysnc storage
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // check the authUser and navigate to screens accordingly on initial render
  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    color: colors.light,
    fontSize: 50,
    fontWeight: "bold",
  },
  logo: {
    resizeMode: "contain",
    width: 90,
    height: 90,
  },
});
