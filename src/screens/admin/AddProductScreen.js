import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import ProgressDialog from "react-native-progress-dialog";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { colors } from "../../constants";
import { createProductApi } from "../../services/Admin_Api/Product/createProductApi";

const AddProductScreen = ({ navigation, route }) => {
  const { categoryList } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [pickedImage, setPickedImage] = useState({});
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [statusDisable, setStatusDisable] = useState(false);
  

  //Method for selecting the image from device gallery
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

  //Method for imput validation and post data to server to insert product using API call
  const addProductHandle = () => {
    setIsloading(true);

    //[check validation] -- Start
    if (title == "") {
      setError("Please enter the product title");
      setIsloading(false);
    } else if (price == 0) {
      setError("Please enter the product price");
      setIsloading(false);
    } else if (quantity <= 0) {
      setError("Quantity must be greater then 1");
      setIsloading(false);
    } else if (description == "") {
      setError("Please upload the product description");
      setIsloading(false);
    } else if (selectedCategoryId == "") {
      setError("Please select product category");
      setIsloading(false);
    } else if (Object.keys(pickedImage).length == 0) {
      setError("Please upload the product image");
      setIsloading(false);
    } else {
      //[check validation] -- End
      
      data = {
        categoryId: selectedCategoryId,
        itemName: title,
        salePrice: price,
        qty: quantity,
        // image: 'data:image/jpeg;base64,' + pickedImage?.base64,
        medicalDescription: description

      }
      createProductApi(data).then((result) => {

        if (result.success == true) {
          setIsloading(false);
          setAlertType("success");
          setError(result.message);
          
          setSelectedCategoryId(''), 
          setTitle(''), 
          setPrice(''), 
          setQuantity(''), 
          setPickedImage({}), 
          setDescription("")

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

  //call the fetch functions initial render
  useEffect(() => {
    const modifiedCategoryItems = categoryList.map((item) => ({
      label: item.title,
      value: item.categoryId,
    }))
    setCategories(modifiedCategoryItems);
  }, [categoryList]);

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
          <Text style={styles.screenNameText}>Add Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Add product details</Text>
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
          <CustomInput
            value={price}
            setValue={setPrice}
            placeholder={"Price"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
          />
          <CustomInput
            value={quantity}
            setValue={setQuantity}
            placeholder={"Quantity"}
            keyboardType={"number-pad"}
            placeholderTextColor={colors.muted}
            radius={5}
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
      <DropDownPicker
        placeholder={"Select Product Category"}
        open={open}
        value={selectedCategoryId}
        items={categories}
        setOpen={setOpen}
        setValue={setSelectedCategoryId}
        disabled={statusDisable}
        disabledStyle={{
          backgroundColor: colors.light,
          borderColor: colors.white,
        }}
        labelStyle={{ color: colors.muted }}
        style={{ borderColor: "#fff", elevation: 5 }}
      />
      <View style={styles.buttomContainer}>
        <CustomButton text={"Add Product"} onPress={addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
