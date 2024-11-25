"use client";

import { LoginForm } from "@/components/normal-forms/LoginForm";
import { authenticate } from "@/libs/actions/authActions";
import { cn } from "@/libs/utils";
import { loginSchema } from "@/libs/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

const Page = () => {
  return (
    <div className="flex items-center justify-center bg-primary-300/5 min-h-screen">
      {/* Logo above the form */}
      <div className="absolute top-10 text-center">
        <img src="/logo.png" alt="Logo" className="h-16 w-16 mx-auto" />
      </div>

      <div className="w-full max-w-md bg-white-500 rounded-lg shadow-md p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-primary">
          Connexion
        </h1>
        {/* Paragraph */}
        <p className="mt-2 text-center text-sm text-black-500">
          Entrez vos identifiants pour vous connecter !
        </p>
        {/* Login form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
