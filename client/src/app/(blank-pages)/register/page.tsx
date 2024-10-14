import React from "react";

const RegisterPage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-white h-[100vh]"
      style={{
        backgroundImage:
          "url('https://tasklms.telangana.gov.in/img/login-top-bg.524c2de8.png')", // Remplacez par le chemin de votre image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset]  lg:h-[100vh] min-h-[100vh]  lg:px-6">
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
            Inscription
          </p>
          <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
            Entrez votre email pour recevoir un code de vérification !
          </p>
          <div className="mt-8">
            <form className="pb-2">
              <div className="grid gap-1">
                <label
                  className="text-zinc-950 dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                  id="email"
                  placeholder="nom@exemple.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  name="email"
                />
                <button
                  className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary-500 text-orange-100 hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                  type="submit"
                >
                  Envoyer le code de vérification
                </button>
              </div>
            </form>
          </div>

          <p className="mb-8 mt-6 text-center text-sm text-zinc-950 dark:text-zinc-400">
            Vous avez déjà un compte ?{" "}
            <a
              href="/dashboard/signin"
              className="font-semibold text-primary hover:underline dark:text-primary"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
