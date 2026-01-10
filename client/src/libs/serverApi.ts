import { AxiosRequestHeaders } from "axios";
import userApi from "./api";
import { auth } from "./auth";

const serverApi = userApi;
serverApi.interceptors.request.use(
  async (config) => {
    const session = await auth();

    const token = session?.user.accessToken || "";

    const headers = (config.headers || {}) as AxiosRequestHeaders;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    headers.Accept = "application/json";

    config.headers = headers;

    return config;
  },
  (error) => Promise.reject(error)
);

export default serverApi;
