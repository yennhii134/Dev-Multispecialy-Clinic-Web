import axios from "axios";

// const DOMAIN = "https://mnq7qzk3-8000.asse.devtunnels.ms/";
// const DOMAIN = "http://localhost:8000/";
const DOMAIN = "https://4k31zpzj-8000.asse.devtunnels.ms/";

export const axiosInstance = axios.create({
  baseURL: DOMAIN,
});
