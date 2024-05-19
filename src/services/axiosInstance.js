//creating axios instance so that we can call it multiple times
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getAsyncStorageTokenInfo = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return token;
};

const axiosInstance = axios.create({
  baseURL: "https://medicine-beta-be.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await getAsyncStorageTokenInfo(); //for handel the promise
    config.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
