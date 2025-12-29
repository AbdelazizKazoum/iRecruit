import clientApi from "@/libs/clientApi";
import { UserType } from "@/types/user.types";

export const userService = {
  getUserProfile: async function (id: string) {
    const { data } = await clientApi.get(`/users/${id}`);

    return data;
  },

  updateProfile: async function (id: string, newUser: UserType) {
    const { data } = await clientApi.patch(`/users/${id}`, newUser);

    return data;
  },

  getAllUsers: async function (params?: {
    page?: number;
    limit?: number;
    role?: string;
    username?: string;
  }) {
    const { data } = await clientApi.get("/users", { params });

    return data;
  },
};
