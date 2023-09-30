import axios from "axios";
import { retrieveLaunchParams } from "@twa.js/sdk";

const isServer = typeof window === "undefined";

const initData = isServer
  ? ""
  : new URLSearchParams(window.location.hash.slice(1)).get("tgWebAppData");

const instance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `twa-init-data ${initData}`,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = retrieveLaunchParams().initDataRaw;
  return config;
});

export default instance;