import { PasswordForm } from "@/components/normal-forms/PasswordForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { code: string } }) => {
  let user = null as { username: string; email: string; code: string } | null;
  try {
    const res = await fetch(
      `${process.env.BACKEND_API}/auth/verify-code/${params.code}`
    );

    user = await res.json();
    console.log(user);
  } catch (error) {
    console.error(error);
    redirect("/login");
  }
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
          Créer un mot de passe{" "}
        </h1>
        {/* Paragraph */}
        <p className="mt-2 text-center text-sm text-black-500">
          Bounjour{" "}
          <strong className=" text-primary-500 ">{user?.username}</strong> ,
          Veuillez créer un mot de passe pour votre compte.
        </p>
        {/* Login form */}
        <PasswordForm code={params.code} />
      </div>
    </div>
  );
};

export default page;
