"use client";

import { authenticate } from "@/libs/actions"; // Adjust the import based on your login action
import { cn } from "@/libs/utils";
import { loginSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Define form schema type
type LoginFormData = {
  email: string;
  password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // State for displaying messages
  const [error, setError] = useState("");

  // Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    const response = await authenticate(data); // Replace with your actual login function

    if (!response) return null;

    if (response.error) {
      setError(response.error || "");
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
            Connexion
          </p>
          <p className="mb-2.5 mt-2.5 font-normal text-black-500 dark:text-gray-400">
            Entrez vos identifiants pour vous connecter !
          </p>

          <div className="mt-8">
            <form className="pb-2">
              <input type="hidden" name="provider" value="google" />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-zinc-950 py-6 dark:text-white"
                type="submit"
              >
                <span className="mr-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                    className="h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                            C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
                            l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238
                            C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                </span>
                <span>Google</span>
              </button>
            </form>
          </div>

          <div className="relative my-4">
            <div className="relative flex items-center py-1">
              <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
              <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex flex-col items-center justify-center mt-4 p-4 bg-orange-100 border border-orange-500 text-orange-500 rounded-md">
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="pb-2">
              <div className="grid gap-1">
                <label
                  className="text-zinc-950 dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={cn(
                    "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
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

                <label
                  className="text-zinc-950 dark:text-white"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <input
                  className={cn(
                    "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                    errors.password && "border-orange-500"
                  )}
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <small className="text-orange-500">
                    {errors.password.message}
                  </small>
                )}

                <button
                  disabled={isSubmitting}
                  className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-500 text-orange-100 hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                  type="submit"
                >
                  {isSubmitting ? "Connexion..." : "Se connecter"}
                </button>
              </div>
            </form>
            <p>
              <a
                href="/account/"
                className="font-normal text-black-500 dark:text-white-500 text-sm"
              >
                Mot de passe oublié ?
              </a>
            </p>
          </div>

          <p className="mb-8 mt-6 text-center text-sm text-black-500 dark:text-gray-400">
            Vous n&apos;avez pas de compte ?{" "}
            <a
              href="/register"
              className="font-semibold text-primary hover:underline dark:text-primary"
            >
              S&apos;inscrire{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
