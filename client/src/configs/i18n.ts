export const i18n = {
  defaultLocale: "fr",
  locales: ["en", "fr", "ar"],
  langDirection: {
    en: "ltr",
    fr: "ltr",
    ar: "rtl",
  },
} as const;

export type Locale = (typeof i18n)["locales"][number];
