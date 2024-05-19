import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { colors } from "../../constants";
import { createCategoryApi } from "../../services/Admin_Api/Category/createCategoryApi";
import { getAllCategoriesApi } from "../../services/Categories&Items/getAllCategoriesApi";

const AddCategoryScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [pickedImage, setPickedImage] = useState("");

  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      mediaType: 'photo',
      base64: true,
    });

    if (!result.canceled) {
      setPickedImage(result?.assets[0]);
    }

  };

  const fetchCategoryList = async () => {
    const result = await getAllCategoriesApi();
    await AsyncStorage.setItem("categoryList", JSON.stringify(result) );

  };

  //Method for imput validation post data to server to insert category using API call
  const addCategoryHandle = () => {
    setIsloading(true);
    //[check validation] -- Start
    if (title == "") {
      setError("Please enter the category title");
      setIsloading(false);
    } else if (Object.keys(pickedImage).length == 0) {
      setError("Please upload the catergory image");
      setIsloading(false);
    } else {
      //[check validation] -- End
      
      data = {
        title: title,
        // image: 'data:image/jpeg;base64,' + pickedImage?.base64,

      }

      createCategoryApi(data).then((result) => {

        if (result.success == true) {
          fetchCategoryList()
          setIsloading(false);
          setAlertType("success");
          setError(result.message);
          setTitle(''), 
          setPickedImage({})    
        }
      })
        .catch((error) => {
          setIsloading(false);
          setError(error.message);
          setAlertType("error");
          console.log("error", error);
        });


    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={"Adding ..."} />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Add Category</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add category details</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.formContainer}>

          <View style={styles.imageContainer}>
           
            {Object.keys(pickedImage).length > 0 ? (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <Image
                  source={{ uri: 'data:image/jpeg;base64,' + pickedImage?.base64 }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.imageHolder} onPress={pickImage}>
                <AntDesign name="pluscircle" size={50} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>

          <CustomInput
            value={title}
            setValue={setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.muted}
            radius={5}
          />

        </View>
      </ScrollView>

      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Category"} onPress={addCategoryHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    marginTop: 10,
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageHolder: {
    height: 200,
    width: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
  },
});
