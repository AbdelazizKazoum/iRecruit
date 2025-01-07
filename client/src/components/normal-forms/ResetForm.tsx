"use client";
import { sendResetLink } from "@/libs/actions/authActions";
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
import { Mail } from "lucide-react"; // Lucide icons
import Link from "next/link";
import { emailSchema } from "@/schemas/authSchema";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";

// Define form schema type
interface ResetPasswordFormType {
  email: string;
}

export const ResetPasswordForm = ({
  locale,
}: // dictionary,
{
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(emailSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // State for displaying messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const onSubmit = async (data: ResetPasswordFormType) => {
    console.log(data);

    const response = await sendResetLink(data.email);

    if (response.success) {
      setMessage("Un lien de réinitialisation a été envoyé à votre email.");
      setError("");
    } else {
      setError(
        "Erreur lors de l'envoi du lien de réinitialisation. Veuillez réessayer."
      );
      setMessage("");
    }

    console.log(response);
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Entrer cotre email"
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
              {isSubmitting
                ? "Envoi en cours.."
                : "Envoyer le lien de réinitialisation"}
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
