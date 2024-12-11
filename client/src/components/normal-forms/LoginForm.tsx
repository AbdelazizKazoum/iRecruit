"use client";
import { authenticate } from "@/libs/actions/authActions";
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
import { Mail, Lock } from "lucide-react"; // Lucide icons
import { loginSchema } from "@/schemas/authSchema";

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [error, setError] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    const response = await authenticate(data);

    if (!response) {
      console.log("🚀 ~ onSubmit ~ response:", response);
      return null;
    }

    if (response.error) {
      setError(response.error || "");
    }

    console.log(response);
  };

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
                    <Input placeholder="Email" className="pl-10" {...field} />
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
                      placeholder="Password"
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
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Form>

      {/* Error Display */}
      {error && (
        <div className="mt-4">
          <AlertDestructive message={error} />
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        <a href="/account/reset" className="text-primary hover:underline">
          Mot de passe oublié ?
        </a>
      </p>
      <p className="mt-4 text-center text-sm text-black-600/60">
        Vous n&apos;avez pas de compte ?{" "}
        <a
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          S&apos;inscrire
        </a>
      </p>
    </div>
  );
};
