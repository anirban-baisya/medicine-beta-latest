import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    Pressable,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    useWindowDimensions
} from "react-native";
import ProgressDialog from "react-native-progress-dialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import emptyBox from "../../../assets/image/emptybox.png";
import CustomInput from "../../components/CustomInput";
import ProductCard from "../../components/ProductCard/ProductCard";
import { colors } from "../../constants";
import { findItemsBySearchQueryApi } from "../../services/Search/itemSearchApi";

const SearchScreen = ({ navigation, router }) => {

    const { top } = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [searchResults, setSearchResults] = useState({
        isLoadMoreData: false,
        itemsList: [],
        totalPageLength: 1,
        isLoading: false,
    });

    const { width } = useWindowDimensions();
    const [pagination, setPagination] = useState({
        page: 1,
        paginate: 10,
    });


    const searchItems = useCallback(() => {
        if (!searchQuery) return;

        const payload = {
            searchQuery: searchQuery,
            page: pagination.page,
            paginate: pagination.paginate
        }
        findItemsBySearchQueryApi(payload).then((data) => {

            const totalItems = [
                ...searchResults.itemsList,
                ...data.items,
            ];

            setSearchResults({
                isLoading: false,
                itemsList:
                    pagination.page === 1 ? data.items : totalItems,
                //   totalLength: data.total_length,
                totalPageLength: data.totalPages,
                isLoadMoreData: false,
            });

        },
        );
    }, [pagination]);

    useEffect(() => {
        searchItems();
    }, [searchItems]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setSearchResults({
            ...searchResults,
            isLoading: true,
        });

        setPagination({
            ...pagination,
            page: 1,
            paginate: 10,
        });

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchMoreItems = () => {
        if (searchResults.totalPageLength > pagination.page && !searchResults.isLoadMoreData) {
            setSearchResults({
                ...searchResults,
                isLoadMoreData: true,
            });

            pagination.page++;

            setPagination({
                ...pagination,
                page: pagination.page,
                // paginate: totalLength,
            });
        }
    };

    const handleOnSubmitSearching = () => {
        if (!searchQuery) {
            setSearchResults({
                isLoadMoreData: false,
                itemsList: [],
                totalPageLength: 1,
                isLoading: false,
            });
            return;
        }

        setSearchResults({
            ...searchResults,
            isLoading: true,
        });

        setPagination({
            ...pagination,
            search: '',
            page: 1,
            paginate: 10,
        });

    };

    //method to navigate to product detail screen of specific product
    const handleProductPress = (product) => {
        navigation.navigate("productdetail", { product: product });
    };


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: top + 10 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                }}
            >
                <Pressable
                    style={{ paddingLeft: 10, marginRight: 15 }}
                    onPress={() => navigation.goBack()}
                >
                    {({ pressed }) => (
                        <FontAwesome
                            name="chevron-left"
                            size={24}
                            color={colors.muted}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>

                <CustomInput value={searchQuery} setValue={setSearchQuery} onSubmitEditing={handleOnSubmitSearching} width="75%" inputType='Search' placeholder={"Search item ..."} />

            </View>

            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                {searchQuery ? (
                    <>
                        {searchResults.itemsList.length === 0 ? (
                            <View
                                style={{
                                    flex: 0.75,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.title}>No Stocks Matching Search</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={searchResults.itemsList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                    />
                                }
                                keyExtractor={(index, item) => `${index}-${item}`}
                                contentContainerStyle={{ margin: 10 }}
                                numColumns={2}
                                renderItem={({ item: product }) => (
                                    <View
                                        style={[
                                            styles.productCartContainer,
                                            { width: (width - width * 0.1) },
                                        ]}
                                    >
                                        <ProductCard
                                            cardSize={"large"}
                                            name={product.itemName}
                                            image={product.image}
                                            price={product.salePrice}
                                            quantity={product.qty}
                                            onPress={() => handleProductPress(product)}
                                        // onPressSecondary={() => handleAddToCat(product)}
                                        />
                                        <View style={styles.emptyView}></View>
                                    </View>
                                )}

                                ListFooterComponent={<>
                                    {searchResults.isLoadMoreData ? (<View
                                        style={styles.loadingWrap}>
                                        <Text style={styles.loadingWrapText}>Loading...</Text>
                                        <ActivityIndicator />
                                    </View>) : null}
                                </>}

                                onEndReachedThreshold={0.2}
                                onMomentumScrollBegin={fetchMoreItems}
                            />

                        )}
                    </>
                ) : (
                    <View
                        style={{
                            flex: 0.75,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* <Text style={styles.title}>Search Stocks ...</Text> */}

                        <View
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.white,
                                height: 150,
                                width: 150,
                                borderRadius: 10,
                            }}
                        >
                            <Image
                                source={emptyBox}
                                style={{ height: 80, width: 80, resizeMode: "contain" }}
                            />
                            <Text style={styles.emptyBoxText}>
                                No matches found
                            </Text>
                        </View>

                    </View>
                )}
            </TouchableWithoutFeedback>

            <ProgressDialog visible={searchResults.isLoading} label={"Loading ..."} />
        </SafeAreaView>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    emptyBoxText: {
        fontSize: 11,
        color: colors.muted,
        textAlign: "center",
    },



    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: colors.light,
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },


    productCartContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 5,
        padding: 5,
        paddingBottom: 0,
        paddingTop: 0,
        marginBottom: 0,
    },

    emptyBoxText: {
        fontSize: 11,
        color: colors.muted,
        textAlign: "center",
    },
    emptyView: {
        height: 20,
    },

    loadingWrap: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    loadingWrapText: {
        fontFamily: 'RubikRegular',
        fontSize: 14,
        color: '#222124',
    },
});
