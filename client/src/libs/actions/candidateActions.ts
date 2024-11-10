"use server";

import { UserType } from "@/types/user.types";
import userApi from "@/libs/api";
console.log("🚀 ~ userApi:", userApi.defaults.baseURL);

export async function getUserProfile(id: string) {
  const { data } = await userApi.get(`/users/${id}`);

  return data;
}

export async function updateProfile(id: string | undefined, newUser: UserType) {
  try {
    const { data } = await userApi.patch(`/users/${id}`, newUser);

    return {
      data,
      sucess: true,
      message: "Utilisateur mis à jour avec succès",
    };
  } catch (error: unknown) {
    console.log("🚀 ~ error:", error);

    return {
      error: error.message,
      success: false,
      message: "",
    };
  }
}
