import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput";
import TotalOrderListAdmin from "../../components/TotalOrderListAdmin";
import { colors } from "../../constants";
import { getAllOrderListForAdminApi } from "../../services/Admin_Api/Order/getAllOrderListForAdminApi";

const ViewOrdersScreen = ({ navigation, route }) => {
  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");


  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  //method to navigate to order detail screen of specific order
  const handleOrderDetail = (orderId) => {
    navigation.navigate("vieworderdetails", {
      orderId,
      fetchOrders
    });
  };

  //method the fetch the order data from server using API call
  const fetchOrders = () => {
   
    setIsloading(true);

    getAllOrderListForAdminApi().then((result) => {
      if (result.success) {
        
        setOrders(result.data);
        setFoundItems(result.data);
        setError("");
      } else {
        setError(result.message);
      }
      setIsloading(false);

    }).catch((error) => {
      setIsloading(false);
      setError(error.message);
      console.log("error", error);
    });

  };

  //method to filer the orders for by title [search bar]
  const filter = () => {
    const keyword = filterItem?.toLowerCase();
    if (keyword !== "") {
      const results = orders?.filter((item) => {
        return Object.values(item).some(val =>
          String(val).toLowerCase().includes(keyword),
        );
      });
      setFoundItems(results);
    } else {
      setFoundItems(orders);
    }
  };
  //filter the data whenever filteritem value change
  useEffect(() => {
    filter();
  }, [filterItem]);

  //fetch the orders on initial render
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar></StatusBar>
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
          <Text style={styles.screenNameText}>View Order</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all orders</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <ScrollView
        style={{ flex: 1, width: "100%", padding: 2 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No order found with the order # ${filterItem}!`}</Text>
        ) : (
          foundItems?.map((order, index) => {
            return (
              <TotalOrderListAdmin
                item={order}
                key={index}
                onPress={() => handleOrderDetail(order?.orderId)}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default ViewOrdersScreen;

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
    justifyContent: "space-between",
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
});
