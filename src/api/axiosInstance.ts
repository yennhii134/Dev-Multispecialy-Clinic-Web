import axios from "axios";

// const DOMAIN = "https://mnq7qzk3-8000.asse.devtunnels.ms/";
const DOMAIN = "http://localhost:8000/";

export const axiosInstance = axios.create({
  baseURL: DOMAIN,
});
