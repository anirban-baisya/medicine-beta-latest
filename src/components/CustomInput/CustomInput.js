import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../constants";

const CustomInput = ({
  inputType,
  value,
  setValue,
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  onFocus,
  radius,
  width = "100%",
  keyboardType,
  maxLength,
  numberOfLines,
  onSubmitEditing
}) => {
  return (
    <View style={{ width: width }}>
     {inputType=='TextArea' ? <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.CustomTextAreaInput}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        borderRadius={radius}
        maxLength={maxLength}
        keyboardType={keyboardType}
        multiline
        numberOfLines={numberOfLines}
      />
     : inputType=='Search' ?<TextInput
                    mode={"outlined"}
                    returnKeyType="search"
                    placeholder={placeholder}
                    autoFocus
                    dense
                    style={styles.CustomInput}
                    value={value}
                    onChangeText={setValue}
                    onSubmitEditing={onSubmitEditing}
                /> 
     : <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.CustomInput}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        borderRadius={radius}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  CustomInput: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    padding: 5,
    backgroundColor: colors.white,
    elevation: 5,
    paddingHorizontal: 20,
  },

  CustomTextAreaInput: {
    // height: 40,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    padding: 5,
    backgroundColor: colors.white,
    elevation: 5,
    paddingHorizontal: 20,
    paddingTop: 13,
    textAlignVertical: 'top'
  },
});
