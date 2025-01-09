"use server";

type ResultType<T> = {
  data?: T;
  success: boolean;
  message: string;
  error?:
    | {
        type: string;
        statusCode?: number;
        message: string;
      }
    | string;
};

import { UserType } from "@/types/user.types";
import userApi from "@/libs/api";
import serverApi from "../serverApi";

export async function getUserProfile(
  email: string
): Promise<ResultType<UserType>> {
  try {
    const { data } = await serverApi.get(`/users/email/${email}`);
    return {
      data,
      success: true,
      message: "Data loaded successfully",
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    let errorType = "UnknownError";
    let statusCode: number | undefined = undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Check for HTTP errors
    if (error instanceof Response) {
      statusCode = error.status;
      errorType = "HttpError";
      errorMessage = `HTTP error with status ${statusCode}`;
    }

    return {
      success: false,
      message: "",

      error: {
        type: errorType,
        statusCode,
        message: errorMessage,
      },
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
