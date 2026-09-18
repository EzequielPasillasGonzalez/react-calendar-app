import { getEnvVariables } from "@/helpers/";
import axios from "axios";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.set("x-token", token);
  }

  return config;
});
export default calendarApi;
