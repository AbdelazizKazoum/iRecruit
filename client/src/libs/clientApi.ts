import { AxiosRequestHeaders } from "axios";
import userApi from "./api";
import { fetchSession } from "@/utils/getSession";

const clientApi = userApi;
clientApi.interceptors.request.use(
  async (config) => {
    const session = await fetchSession();

    const token = session?.user.accessToken || "";

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => Promise.reject(error)
);

export default clientApi;
