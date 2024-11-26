import { LoginForm } from "@/components/normal-forms/LoginForm";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-300/5 min-h-screen">
      {/* Logo above the form */}
      <div className="h-20 w-60 relative block  mb-8">
        <Image
          src="/assets/logo-ministere.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
          priority
        />
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
