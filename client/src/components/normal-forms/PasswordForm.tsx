"use client";
import { createPassword } from "@/libs/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlertDestructive } from "../alerts/AlertDestructive";
import { Lock } from "lucide-react"; // Lucide icons
import Link from "next/link";
import { passwordSchema } from "@/schemas/authSchema";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";

// Define form schema type
type RegisterFormData = {
  password: string;
  confirmPassword: string;
};

export const PasswordForm = ({
  code,
  locale,
  dictionary,
}: {
  code: string;
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  // State for displaying messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Hooks
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    const response = await createPassword(code, data.password);

    if (response.error) {
      setError(response.error);
      setMessage("");
    } else {
      setError("");
      setMessage(response.message);
      reset(); // Clear the form fields
    }
  };

  return (
    <div>
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

          <Button
            onClick={() => router.push(`/${locale}/login`)}
            variant={"outline"}
            className=" mt-3 bg-green-500/10 border-green-500 hover:bg-green-500/20 hover:text-green-500 "
          >
            Connexion
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4">
          <AlertDestructive message={error} />
        </div>
      )}

      {/* Form */}
      {!message && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-4"
          >
            {/* Username Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Mot de passe"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Confirmer le mot de passe"
                        type="password"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button disabled={isSubmitting} className="w-full transition">
              {isSubmitting ? "Creation..." : "Créer le mot de passe"}
            </Button>
          </form>
        </Form>
      )}

      <p className="mt-4 text-center text-sm text-black-600/60">
        Vous avez déjà un compte ?{" "}
        <Link
          href={`/${locale}/login`}
          className="text-primary font-medium hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
};
