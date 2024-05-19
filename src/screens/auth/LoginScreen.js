import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { colors } from "../../constants";
// import header_logo from "../../../assets/logo/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import ProgressDialog from "react-native-progress-dialog";
import { useDispatch, useSelector } from "react-redux";
import header_logo from "../../../assets/logo/logo2.png";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomButton from "../../components/CustomButton";
import { onUserLoginSubmit } from "../../redux/slicers/loginSlicer";
import { getAllCategoriesApi } from "../../services/Categories&Items/getAllCategoriesApi";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginUserInfo = useSelector((state) => state.loginReducer.data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  //method to store the authUser to aync storage
  _storeData = async (dataType, user) => {
    try {
      dataType == 'userDetails' ? AsyncStorage.setItem("authUser", JSON.stringify(user))
        : AsyncStorage.setItem("userToken", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };


  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const loginHandle = () => {
    setIsloading(true);
    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (password == "") {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    // length of password must be greater than 5 characters
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be 6 characters long");
    }
    //[check validation] -- End

    dispatch(
      onUserLoginSubmit({
        email: email,
        password: password,
        loginType: "email",
      })
    );
  };

  const fetchCategoryList = async () => {
    const result = await getAllCategoriesApi();
     setCategoryList(result);
    await AsyncStorage.setItem("categoryList", JSON.stringify(result) );

  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  
  useEffect(() => {

    if (
      loginUserInfo?.status == 200 ||
      (loginUserInfo?.token && loginUserInfo.success != false)
    ) {
      if (loginUserInfo?.userDetails?.userType == "ADMIN") {
        //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
        _storeData('userDetails', loginUserInfo.userDetails);
        _storeData('token', loginUserInfo.token);
        setIsloading(false);
        navigation.replace("dashboard", { authUser: loginUserInfo.userDetails, categoryList }); // naviagte to Admin Dashboard
      } else {
        _storeData('userDetails', loginUserInfo.userDetails);
        _storeData('token', loginUserInfo.token);
        setIsloading(false);
        navigation.replace("tab", { user: loginUserInfo.userDetails, categoryList: categoryList }); // naviagte to User Dashboard
      }
    } else if (loginUserInfo != null) {
      setIsloading(false);
      
      return setError(loginUserInfo?.message);
    }

  }, [loginUserInfo]);


  return (
    <InternetConnectionAlert onChange={(connectionState) => { }}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <ProgressDialog visible={isloading} label={"Login ..."} />
          <StatusBar></StatusBar>
          <View style={styles.welconeContainer}>
            <View>
              <Text style={styles.welcomeText}>Welcome to MedicineBeta</Text>
              <Text style={styles.welcomeParagraph}>
                make your ecommerce easy
              </Text>
            </View>
            <View>
              <Image style={styles.logo} source={header_logo} />
            </View>
          </View>
          <View style={styles.screenNameContainer}>
            <Text style={styles.screenNameText}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <CustomAlert message={error} type={"error"} />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Username"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <View style={styles.forgetPasswordContainer}>
              <Text
                onPress={() => navigation.navigate("forgetpassword")}
                style={styles.ForgetText}
              >
                Forget Password?
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
          <CustomButton text={"Login"} onPress={loginHandle} />
        </View>
        <View style={styles.bottomContainer}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("signup")}
            style={styles.signupText}
          >
            signup
          </Text>
        </View>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    // padding:15
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
