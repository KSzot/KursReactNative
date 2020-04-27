import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://0d11834d.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, //ta pobierze zapytanie
  (error) => {
    return Promise.reject(error);
  } // ta wykona sie tylko gdy napotka blad z polaczeniem
);
export default instance;
