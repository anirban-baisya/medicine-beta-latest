import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../../../assets/icons/cart_beg_active.png";
import CartProductList from "../../components/CartProductList/CartProductList";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constants";
import { addProductToMyCart, deleteMyCartItem, removeMyCartItem } from "../../redux/slicers/myCartSlicer";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const CartScreen = ({ navigation }) => {
  const cartproduct = useSelector((state) => state.myCartReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const dispatch = useDispatch();


  //method to remove the item from (cart) redux
  const deleteItem = (id) => {
    dispatch(deleteMyCartItem(id));
  };

  //method to increase the quantity of the item in(cart) redux
  const increaseQuantity = (item, quantity, avaiableQuantity) => {
    if (avaiableQuantity > quantity) {
      dispatch(addProductToMyCart(item));
      setRefresh(!refresh);
    }
  };

  //method to decrease the quantity of the item in(cart) redux
  const decreaseQuantity = (item, quantity) => {
    if (quantity > 1) {
      dispatch(removeMyCartItem(item));
      setRefresh(!refresh);
    }
  };

  //calcute and the set the total price whenever the value of carproduct change & rounding the result to two decimal places 
  useEffect(() => {
    setTotalPrice(
      (Math.round(
        cartproduct.reduce((accumulator, object) => {
          return accumulator + object.salePrice * object.purchaseQty;
        }, 0) * 100) / 100).toFixed(2)
    );
  }, [cartproduct, refresh]);

  //method to handle checkout
  const handleCheckout = () => {
    if (totalPrice < 700) {
      setError("Minimum order amount should be greater than or equal to 700");
      setAlertType("error");
      setTimeout(() => setAlertType(""), 3000);
      return;
    }
    navigation.navigate("checkout");
  }

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      {alertType && <CustomAlert message={error} type={alertType} />}

      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
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
          <View style={styles.cartInfoTopBar}>
            <Text>Your Cart</Text>
            <Text>{cartproduct?.length} Items</Text>
          </View>
        </View>

        <View></View>
        <TouchableOpacity>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      {cartproduct?.length === 0 ? (
        <View style={styles.cartProductListContiainerEmpty}>
          {/* <Image
            source={CartEmpty}
            style={{ height: 400, resizeMode: "contain" }}
          /> */}
          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartProductListContiainer}>
          {cartproduct?.map((item, index) => (
            <CartProductList
              key={index}
              index={index}
              image={item.image}
              title={item.itemName}
              price={item.salePrice}
              quantity={item.purchaseQty}
              onPressIncrement={() => {
                increaseQuantity(
                  item,
                  item.purchaseQty,
                  item.qty,
                );
              }}
              onPressDecrement={() => {
                decreaseQuantity(item, item.purchaseQty);
              }}
              handleDelete={() => {
                deleteItem(item.itemId);
              }}
            />
          ))}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
      <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <MaterialIcons
              name="featured-play-list"
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>₹ {totalPrice}</Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          {cartproduct?.length > 0 ? (
            <CustomButton
              text={"Checkout"}
              onPress={handleCheckout}
            />
          ) : (
            <CustomButton
              text={"Checkout"}
              disabled={true}
              onPress={() => navigation.navigate("checkout")}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  cartProductListContiainer: { width: "100%", padding: 20 },
  cartProductListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    width: "100%",
    height: 120,
    display: "flex",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBottomLeftContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    height: "100%",
  },
  cartBottomRightContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    height: "100%",
  },
  cartBottomPrimaryText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cartBottomSecondaryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  cartInfoContainerTopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartInfoTopBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 5,
  },
});
