import PasswordForm from "@/components/normal-forms/Password";
import { redirect } from "next/navigation";
import React from "react";

const PasswordCreationPage = async ({
  params,
}: {
  params: { code: string };
}) => {
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
    <div
      className="flex flex-col justify-center items-center bg-white h-[100vh]"
      style={{
        backgroundImage:
          "url('https://tasklms.telangana.gov.in/img/login-top-bg.524c2de8.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] lg:h-[100vh] min-h-[100vh] lg:px-6">
        <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/home">
          <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
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
              Retour au site web
            </p>
          </div>
        </a>

        <div className="my-auto mb-auto mt-3 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[100px] lg:max-w-[450px]">
          <p className="text-[32px] font-bold text-zinc-950 dark:text-white">
            Créer un mot de passe
          </p>
          <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
            Bounjour{" "}
            <strong className=" text-primary-500 ">{user?.username}</strong> ,
            Veuillez créer un mot de passe pour votre compte.
          </p>
          <div className="mt-4">
            <PasswordForm code={params.code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCreationPage;
