import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {


  return config;
});