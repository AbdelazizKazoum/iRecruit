/* eslint-disable import/no-unresolved */
import axios from "axios";
console.log("🚀 ~ BACKEND_API:", process.env.NEXT_PUBLIC_BACKEND_API);

const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
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
