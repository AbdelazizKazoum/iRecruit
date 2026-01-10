import { AxiosRequestHeaders } from "axios";
import userApi from "./api";
import { fetchSession } from "@/utils/getSession";

const clientApi = userApi;
clientApi.interceptors.request.use(
  async (config) => {
    const session = await fetchSession();
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

export default clientApi;
