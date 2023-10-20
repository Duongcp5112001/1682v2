import axios from "axios";
import { HOST_API_URL } from "~/utils/config";

const axiosInstance = axios.create({ baseURL: HOST_API_URL });

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (err: any) =>
    Promise.reject(err.response ? err.response.data : "Something went wrong")
);

export default axiosInstance;
