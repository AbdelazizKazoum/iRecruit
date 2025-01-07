/* eslint-disable import/no-unresolved */
import axios from "axios";
import { BACKEND_API } from "@/utils/constants/envVariables";
console.log("🚀 ~ BACKEND_API:", BACKEND_API);

const userApi = axios.create({
  baseURL: BACKEND_API,
});

// userApi.interceptors.request.use(
//   async (config) => {
//     const session = await auth();

//     const token = (await session?.user.accessToken) || "";

//     console.log("🚀 ~ token:", token);

//     config.headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     } as AxiosRequestHeaders;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default userApi;
