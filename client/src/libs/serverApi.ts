import { AxiosRequestHeaders } from "axios";
import userApi from "./api";
import { fetchSession } from "@/utils/getSession";

const serverApi = userApi;
serverApi.interceptors.request.use(
  async (config) => {
    const session = await fetchSession();

    const token = session?.user.accessToken || "";

    console.log("🚀 ~ token from get session :", token);

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => Promise.reject(error)
);

export default serverApi;
