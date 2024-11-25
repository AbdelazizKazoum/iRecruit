import { authenticate } from "@/libs/actions/authActions";
import { cn } from "@/libs/utils";
import { loginSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { errors, isSubmitting },
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Mot de passe</FormLabel> */}
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} className="w-full  transition ">
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </Form>

      {/* Error Display */}
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
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
