import userApi from "@/libs/api";
import { UserType } from "@/types/user.types";

export const userService = {
  getUserProfile: async function (id: string) {
    const { data } = await userApi.get(`/users/${id}`);

    return data;
  },

  updateProfile: async function (id: string, newUser: UserType) {
    const { data } = await userApi.patch(`/users/${id}`, newUser);

    return data;
  },

  getAllUsers: async function (params?: {
    page?: number;
    limit?: number;
    role?: string;
    username?: string;
  }) {
    const { data } = await userApi.get("/users", { params });

    return data;
  },
};
