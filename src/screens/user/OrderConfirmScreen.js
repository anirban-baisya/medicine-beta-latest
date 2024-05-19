import { StyleSheet, Image, Text, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import SuccessImage from "../../../assets/image/success.png";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderConfirmScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  //method to get authUser from async storage
  const getUserData = async () => {
    const value = await AsyncStorage.getItem("authUser");
    const list = await AsyncStorage.getItem("categoryList");

    setUser(JSON.parse(value));
    setCategoryList(JSON.parse(list));
  };

  //fetch user data on initial render
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.imageConatiner}>
        <Image source={SuccessImage} style={styles.Image} />
      </View>
      <Text style={styles.secondaryText}>Yay!! Order has been confirmed</Text>
      <View>
        <CustomButton
          text={"Back to Home"}
          onPress={() => navigation.replace("tab", { user: user , categoryList: categoryList})}
        />
      </View>
    </View>
  );
};

export default OrderConfirmScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
    flex: 1,
  },
  imageConatiner: {
    width: "100%",
  },
  Image: {
    width: 400,
    height: 300,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
