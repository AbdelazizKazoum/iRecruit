"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";
import axios from "axios";

// Login action
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Authenticated failed !", error);

      switch (error.type) {
        case "CredentialsSignin":
          return "Email ou mot de passe invalide. Veuillez réessayer.";
        default:
          console.log(error.message);
          return "Somthing went wrong." + error.message;
      }
    }
    throw error;
  }
}

export async function handleLogout() {
  await signOut({
    redirectTo: "/",
  });
}

// type FormState = {
//   message: string;
// };

// Send the verification link
export async function sendVerificationLink(prevState: any, formData: FormData) {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/verify-email",
      {
        email: formData.get("email"),
        username: formData.get("username"),
      }
    );
    return {
      message: "Un link de vérification a été envoyé à votre e-mail",
      data: res.data,
    };
  } catch (error: any) {
    switch (error.status) {
      case 404:
        return {
          error: "Not found Error !",
          message: "",
        };
      case 409:
        return {
          error: "L'utilisateur existe déjà",
          message: "",
        };

      default:
        return {
          error: "Somthing wrong !",
          message: "",
        };
    }
  }
}

// Send the verification link
export async function createPassword(prevState: any, formData: FormData) {
  try {
    const res = await axios.post("http://localhost:4000/api/users/register", {
      password: formData.get("password"),
      code: prevState.code,
    });
    return {
      sucess: true,
      message:
        "Votre mot de passe a été créé avec succès. Vous pouvez maintenant vous connecter à votre compte et poursuivre avec votre candidature.",
      data: res.data,
    };
  } catch (error: any) {
    switch (error.status) {
      case 404:
        return {
          error: "Not found Error !",
          message: "",
          code: prevState.code,
        };
      case 401:
        return {
          error: "Le code de vérification est invalide !",
          message: "",
          code: prevState.code,
        };
      case 409:
        return {
          error: "Le mot de passe a déjà été créé.",
          message: "",
        };

      default:
        return {
          error: "Une erreur s'est produite !",
          message: "",
          code: prevState.code,
        };
    }
  }
}
