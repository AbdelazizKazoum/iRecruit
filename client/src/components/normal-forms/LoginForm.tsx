/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { authenticate } from "@/libs/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
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
import { Mail, Lock, EyeOff, Eye } from "lucide-react"; // Lucide icons
import { loginSchema } from "@/schemas/authSchema";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = ({
  locale,
  dictionary,
}: // dictionary,
{
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // State
  const [error, setError] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(async (data: LoginFormData) => {
    const response = await authenticate(data);

    if (!response) {
      return null;
    }
    if (response.error) {
      if (response.error === "401")
        setError({
          en: "Invalid email or password. Please try again.",
          fr: "Email ou mot de passe invalide. Veuillez réessayer.",
          ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
        });
      else
        setError({
          en: "There is a problem, please try again.",
          fr: "Il y a un problème, Veuillez réessayer.",
          ar: "هناك مشكلة، يرجى المحاولة مرة أخرى.",
        });
    }

    console.log(response);
  }, []);

  return (
    <div>
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={dictionary.login.emailPlaceholder}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={dictionary.login.passwordPlaceholder}
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className=" text-black-500 " size={18} />
                      ) : (
                        <Eye className=" text-black-500 " size={18} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button disabled={isSubmitting} className="w-full transition">
            {isSubmitting
              ? dictionary.login.submitButton.submitting
              : dictionary.login.submitButton.default}
          </Button>
        </form>
      </Form>

      {/* Error Display */}
      {error && (
        <div className="mt-4">
          <AlertDestructive message={error[locale]} />
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        <a
          href={`/${locale}/account/reset`}
          className="text-primary hover:underline"
        >
          {dictionary.login.forgotPassword}
        </a>
      </p>
      <p className="mt-4 text-center text-sm text-black-600/60">
        {dictionary.login.noAccountText}{" "}
        <a
          href={`/${locale}/register`}
          className="text-primary font-medium hover:underline"
        >
          {dictionary.login.registerLink}
        </a>
      </p>
    </div>
  );
};
