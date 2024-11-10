"use server";

type ResultType<T> = {
  data?: T;
  success: boolean;
  message: string;
  error?: string;
};

import { UserType } from "@/types/user.types";
import userApi from "@/libs/api";

export async function getUserProfile(id: string) {
  try {
    const { data } = await userApi.get(`/users/${id}`);

    return {
      data,
      success: true,
      message: "Data loaded successfully",
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: "",
      error: errorMessage,
    };
  }
}

export async function updateProfile(
  id: string | undefined,
  newUser: UserType
): Promise<ResultType<UserType>> {
  try {
    const { data } = await userApi.patch(`/users/${id}`, newUser);

    return {
      data,
      success: true,
      message: "Utilisateur mis à jour avec succès",
    };
  } catch (error: unknown) {
    console.log("🚀 ~ error:", error);

    const errorMessage = "An unknown error occurred";
    // if (error instanceof Error) {
    //   errorMessage = error.message;
    // }

    return {
      success: false,
      message: "",
      error: errorMessage,
    };
  }
}
