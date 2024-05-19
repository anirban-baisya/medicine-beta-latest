import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants";

const QuickOrderCard = ({
  imagePath = "",
  imageHeight = "",
  title = " ",
  description = "",
  onPressView,
}) => {
 
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={imagePath}
            style={{ height: imageHeight, width: "auto", resizeMode: "contain" }}
          />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Text style={styles.categoryDescription}>{description}</Text>
          {/* <Text style={styles.categoryDescription}>{`${description.substring(
            0,
            30
          )}..`}</Text> */}
        </View>
      </View>
      <View style={styles.categoryActionContainer}>
        <View style={styles.infoButtonContainer}>
                <Ionicons name="chevron-forward" size={25} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuickOrderCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: colors.white,
    height: 80,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    width: 70,
    height: 62,
    elevation: 5,
    display: "flex",
    justifyContent: "center",

    backgroundColor: colors.light,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryDescription: {
    fontSize: 12,
    color: colors.muted,
  },
  categoryInfo: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  }
});
