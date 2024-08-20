import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://www.dev.farmwarehouse.ng/api/users/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
