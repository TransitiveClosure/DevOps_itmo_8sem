import axios from "axios";

// axios instance for making requests
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api/v1`,
});

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});

export default axiosInstance;
