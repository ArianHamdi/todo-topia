import axios from "axios";
import { retrieveLaunchParams } from "@twa.js/sdk";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = retrieveLaunchParams().initDataRaw;
  return config;
});

export default instance;