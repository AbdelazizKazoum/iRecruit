import { PasswordForm } from "@/components/normal-forms/PasswordForm";
import { Locale } from "@/configs/i18n";
import { getDictionary } from "@/utils/getDictionary";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { code: string; lang: Locale } }) => {
  let user = null as { username: string; email: string; code: string } | null;
  const dictionary = await getDictionary(params.lang);
  try {
    const res = await fetch(
      `${process.env.BACKEND_API}/auth/verify-code/${params.code}`
    );

    user = await res.json();
  } catch (error) {
    console.error(error);
    redirect(`/${params.lang}/login`);
  }
  return (
    <div className="flex flex-col items-center justify-center bg-primary-300/5 min-h-screen">
      <a
        className=" absolute top-2 left-10 mt-10 w-fit text-black-600/80 dark:text-white"
        href={`/${params.lang}/home`}
      >
        <div className="flex gap-2 w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
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
            {dictionary.backToHome}
          </p>
        </div>
      </a>
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
          {dictionary.createPasswordForm.pageTitle}{" "}
        </h1>
        {/* Paragraph */}
        <p className="mt-2 text-center text-sm text-black-500">
          {dictionary.createPasswordForm.greetingMessage1}{" "}
          <strong className=" text-primary-500 ">{user?.username}</strong>
          {dictionary.createPasswordForm.greetingMessage2}
        </p>
        {/* Login form */}
        <PasswordForm
          code={params.code}
          locale={params.lang}
          dictionary={dictionary}
        />
      </div>
    </div>
  );
};

export default page;
