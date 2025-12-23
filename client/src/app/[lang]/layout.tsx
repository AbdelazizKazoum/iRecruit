import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Type Imports
import type { ChildrenType } from "@/types/types";
import type { Locale } from "@/configs/i18n";

// HOC Imports
import TranslationWrapper from "@/hocs/TranslationWrapper";

// Config Imports
import { i18n } from "@/configs/i18n";
import { headers } from "next/headers";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-main",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "iRecruit",
  description: "Recruitment Platform",
};

const RootLayout = ({
  children,
  params,
}: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const headersList = headers();
  const direction = i18n.langDirection[params.lang];
  const font = params.lang === "ar" ? cairo : inter;

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id="__next" lang={params.lang} dir={direction}>
        <body className={`${font.className} ${font.variable}`}>
          <ToastContainer />
          {children}
        </body>
      </html>
    </TranslationWrapper>
  );
};

export default RootLayout;
