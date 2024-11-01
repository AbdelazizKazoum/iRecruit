"use client";

import { sendVerificationLink } from "@/libs/actions";
import { cn } from "@/libs/utils";
import { registerSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Define form schema type
type RegisterFormData = {
  email: string;
  username: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // State for displaying messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form submission handler
  const onSubmit = async (data: RegisterFormData) => {
    const response = await sendVerificationLink(data);

    if (response.success) {
      setMessage(response.message);
      setError("");
    } else {
      setError(response.error || "");
      setMessage("");
    }

    console.log(response);
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white h-[100vh]"
      style={{
        backgroundImage:
          "url('https://tasklms.telangana.gov.in/img/login-top-bg.524c2de8.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 lg:h-[100vh] min-h-[100vh] lg:px-6">
        <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/home">
          <div className="flex w-fit items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              className="mr-3 h-[13px] w-[8px] text-zinc-950 dark:text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <p className="ml-0 text-sm text-zinc-950 dark:text-white">
              Retour au site web
            </p>
          </div>
        </a>

        <div className="my-auto mt-3 w-[350px] max-w-[450px] mx-auto lg:mt-[100px]">
          <p className="text-[32px] font-bold text-zinc-950 dark:text-white">
            Inscription
          </p>
          <p className="mb-2.5 mt-2.5 font-normal text-black-500 dark:text-gray-400">
            Entrez votre email pour recevoir un code de vérification !
          </p>

          {/* Message Display */}
          {message && (
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
                className="lucide lucide-check text-green-500 "
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex flex-col items-center justify-center mt-4 p-4 bg-orange-100 border border-orange-500 text-orange-500 rounded-md">
              <span>{error}</span>
            </div>
          )}
          {!message && (
            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="pb-2">
                <div className="grid gap-1">
                  <label
                    className="text-zinc-950 dark:text-white"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className={cn(
                      "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-gray-400  bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                      errors.username && "border-orange-500"
                    )}
                    id="username"
                    type="text"
                    {...register("username")}
                  />
                  {errors.username && (
                    <small className="text-orange-500">
                      {errors.username.message}
                    </small>
                  )}

                  <label
                    className="text-zinc-950 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className={cn(
                      "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                      errors.email && "border-orange-500"
                    )}
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="text-orange-500">
                      {errors.email.message}
                    </small>
                  )}

                  <button
                    disabled={isSubmitting}
                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-500 text-orange-100 hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                    type="submit"
                  >
                    {isSubmitting
                      ? "Envoi..."
                      : "Envoyer le code de vérification"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <p className="mb-8 mt-6 text-center text-sm text-black-500 dark:text-zinc-400">
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
              className="font-semibold text-primary hover:underline dark:text-primary"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
