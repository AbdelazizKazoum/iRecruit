/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createPassword } from "@/libs/actions";
import { cn } from "@/libs/utils";
import { passwordSchema } from "@/libs/zod";
import React, { useState } from "react";
import { useFormState } from "react-dom";

const PasswordForm = ({ code }: { code: string }) => {
  console.log("🚀 ~ PasswordForm ~ code:", code);
  // Hooks
  const [state, dispatch] = useFormState(createPassword, {
    message: "",
    error: "",
    code: code,
  });

  // state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  // Validate form fields
  const validate = (formData: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      passwordSchema.parse(formData);
      setErrors({ password: "", confirmPassword: "" });
      return true;
    } catch (err: any) {
      const zodErrors = err.errors.reduce(
        (acc: any, error: any) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(zodErrors);
      return false;
    }
  };

  // Update form data on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ ...formData, [name]: value });
  };

  return (
    <>
      {" "}
      {/* Message Display */}
      {state.message && (
        <div className="flex flex-col items-center justify-center mt-4 p-4 bg-green-100 border border-green-400 text-green-500 rounded-md">
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

          <span>{state.message}</span>
          <a
            href="/login"
            className="font-semibold mt-3 text-primary-500 hover:underline dark:text-primary-500"
          >
            Se connecter
          </a>
        </div>
      )}
      {/* Form Display */}
      {!state.message && (
        <>
          {" "}
          <form className="pb-2" action={dispatch}>
            <div className="grid gap-1">
              <label
                className="text-zinc-950 dark:text-white"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                id="password"
                placeholder="Mot de passe"
                type="password"
                autoComplete="new-password"
                className={cn(
                  "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                  errors.password && "border-orange-500"
                )}
                name="password"
                onChange={handleInputChange}
              />
              {errors.password && (
                <small className="text-orange-500">{errors.password}</small>
              )}
              <label
                className="text-zinc-950 dark:text-white"
                htmlFor="confirm_password"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirm_password"
                placeholder="Confirmer le mot de passe"
                type="password"
                autoComplete="new-password"
                className={cn(
                  "mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400",
                  errors.confirmPassword && "border-orange-500"
                )}
                name="confirmPassword"
                onChange={handleInputChange}
              />

              {errors.confirmPassword && (
                <small className="text-orange-500">
                  {errors.confirmPassword}
                </small>
              )}
              <button
                disabled={
                  (errors.password !== "" && errors.password !== "") ||
                  (formData.confirmPassword === "" &&
                    formData.confirmPassword === "")
                }
                className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-500 text-orange-100 hover:bg-primary/90 mt-4 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                type="submit"
              >
                Créer le mot de passe
              </button>
              <p className="text-orange-500">{state && state?.error}</p>
              <p className="text-green-500">{state && state?.message}</p>
            </div>
          </form>{" "}
          <p className="mb-8 mt-6 text-center text-sm text-zinc-950 dark:text-zinc-400">
            Vous avez déjà un compte ?{" "}
            <a
              href="/dashboard/signin"
              className="font-semibold text-primary hover:underline dark:text-primary"
            >
              Se connecter
            </a>
          </p>
        </>
      )}
    </>
  );
};

export default PasswordForm;
