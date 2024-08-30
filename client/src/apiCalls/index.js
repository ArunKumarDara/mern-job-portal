import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/app/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

export default axiosInstance;
