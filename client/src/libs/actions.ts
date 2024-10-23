"use server";
import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";

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
