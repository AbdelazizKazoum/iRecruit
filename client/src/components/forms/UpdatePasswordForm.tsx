"use client";
import { updatePassword } from "@/libs/actions"; // Update this import if needed
import { cn } from "@/libs/utils";
import { passwordSchema } from "@/libs/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UpdatePasswordForm = ({ code }: { code: string }) => {
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Hooks
  const router = useRouter();

  // State for messages
  const [successMessage, setSuccessMessage] = React.useState("");
  const [error, setError] = React.useState("");

  // Handle form submission
  const handleFormSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    const response = await updatePassword(code, data.password); // Send the new password to your backend API

    if (response.error) {
      // Handle error (display a message, etc.)
      setError(
        "La mise à jour de votre mot de passe a échoué. Veuillez réessayer plus tard."
      );
      setSuccessMessage("");
    } else {
      setSuccessMessage("Votre mot de passe a été mis à jour avec succès !");
    }
    reset(); // Clear the form fields after submission
  };

  return (
    <>
      {/* Success Message Display */}
      {successMessage && (
        <div className="flex flex-col items-center justify-center mt-4 p-4 bg-green-500/10 border border-green-500 text-green-500 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check text-green-500"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{successMessage}</span>

          <Button
            onClick={() => router.replace("/login")}
            variant={"outline"}
            className="mt-3 bg-green-500/10 border-green-500 hover:bg-green-500/20 hover:text-green-500"
          >
            Connexion
          </Button>
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <div className="flex flex-col items-center justify-center p-4 bg-orange-100 border border-orange-500 text-orange-500 rounded-md">
          <span>{error}</span>
        </div>
      )}

      {/* Form Display */}
      {!successMessage && (
        <form className="pb-2 mt-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-1">
            <label className="text-zinc-950 dark:text-white" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              placeholder="Mot de passe"
              type="password"
              autoComplete="new-password"
              className={cn(
                "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                errors.password && "border-orange-500"
              )}
              {...register("password")}
            />
            {errors.password && (
              <small className="text-orange-500">
                {errors.password.message}
              </small>
            )}
            <label
              className="text-zinc-950 dark:text-white"
              htmlFor="confirmPassword"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              placeholder="Confirmer le mot de passe"
              type="password"
              autoComplete="new-password"
              className={cn(
                "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                errors.confirmPassword && "border-orange-500"
              )}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <small className="text-orange-500">
                {errors.confirmPassword.message}
              </small>
            )}
            <button
              disabled={isSubmitting}
              className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-500 text-orange-100 hover:bg-primary/90 mt-4 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
              type="submit"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      )}

      <p className="mb-8 mt-6 text-center text-sm text-zinc-950 dark:text-zinc-400">
        Vous avez déjà un compte ?{" "}
        <a
          href="/login"
          className="font-semibold text-primary hover:underline dark:text-primary"
        >
          Se connecter
        </a>
      </p>
    </>
  );
};

export default UpdatePasswordForm;
