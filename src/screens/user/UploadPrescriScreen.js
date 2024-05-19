import { AntDesign, Ionicons } from "@expo/vector-icons";
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
import { colors, network } from "../../constants";
import { orderWithPrescriApi } from "../../services/Quick Order/orderWithPrescriApi";

const UploadPrescriScreen = ({ navigation, route }) => {
  const { userInfo } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [pickedImage, setPickedImage] = useState({});
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("error");
  var payload = [];



  //Method for selecting the pickedImage from device gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the pickedImage library
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

  //Method for imput validation and post data to server to insert product using API call
  const uploadDetailsHandle = () => {
    setIsloading(true);
    const indianNoRegex = /^[6-9]{1}[0-9]{9}$/;

    //[check validation] -- Start
    if (phoneNo == "") {
      setError("Please enter your phoneNo");
      setIsloading(false);
    } else if (indianNoRegex.test(phoneNo) != true) {
      setError("Please enter valid 10 digit phoneNo");
      setIsloading(false);
    } else if (Object.keys(pickedImage).length == 0) {
      setError("Please upload the prescription image");
      setIsloading(false);
    } else {
      //[check validation] -- End
      data = {
        userId: userInfo.id,
        prescription: 'data:image/jpeg;base64,' + pickedImage?.base64,
        phoneNumber: phoneNo,
        description: description
      }
      orderWithPrescriApi(data).then((result) => {
  
          if (result.success == true) {
            setIsloading(false);
            setAlertType("success");
            setError(result.message);
            setPhoneNo(''), setPickedImage({}), setDescription("")
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
            // navigation.replace("viewproduct", { authUser: authUser });
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
          <Text style={styles.screenNameText}>Upload Prescription / Medicine List</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add prescription details</Text>
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
            value={phoneNo}
            setValue={setPhoneNo}
            placeholder={"Mobile No"}
            placeholderTextColor={colors.muted}
            radius={5}
            keyboardType={"number-pad"}
          />

          <CustomInput
            inputType={'TextArea'}
            numberOfLines={5}
            value={description}
            setValue={setDescription}
            placeholder={"Description"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
        </View>
      </ScrollView>

      <View style={styles.buttomContainer}>
        <CustomButton text={"Upload Details"} onPress={uploadDetailsHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UploadPrescriScreen;

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

  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 25,
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
