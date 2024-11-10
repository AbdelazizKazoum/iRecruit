/* eslint-disable import/no-unresolved */

import type { AxiosRequestHeaders } from "axios";
import axios from "axios";
import { BACKEND_API } from "@/utils/constants";
import { auth } from "./auth";

const userApi = axios.create({
  baseURL: BACKEND_API,
});

userApi.interceptors.request.use(
  async (config) => {
    let session = null;

    try {
      session = (await auth()) || null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      session = null;
    }

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

export default userApi;
