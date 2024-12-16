import userApi from "@/libs/api";
import axios, { AxiosRequestHeaders } from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useApiClient = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = userApi.interceptors.request.use(
      async (config) => {
        const token = session?.user.accessToken || "";

        console.log("🚀 ~ token:", token);

        config.headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        } as AxiosRequestHeaders;

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return userApi;
};

export default useApiClient;
