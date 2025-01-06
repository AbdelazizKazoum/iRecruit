// Assuming this is your server component in Next.js 13+ (e.g., app/verify-email/page.tsx)

import { Locale } from "@/configs/i18n";
import { redirect } from "next/navigation";
import { FC } from "react";

// Define the server component
const Page: FC<{
  searchParams: { code?: string };
  params: { lang: Locale };
}> = ({ searchParams, params }) => {
  const code = searchParams?.code;

  if (code) redirect(`/${params.lang}/register/password/` + code);

  return (
    <div>
      <h1>Verify Email</h1>
      {code ? (
        <p>Your verification code is: {code}</p>
      ) : (
        <p>No verification code found.</p>
      )}
    </div>
  );
};

export default Page;
