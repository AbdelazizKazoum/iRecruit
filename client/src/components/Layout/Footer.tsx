import themeConfig from "@/configs/themeConfig";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/configs/i18n";

const Footer = ({
  dictionary,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) => {
  const phoneLink = dictionary.contact.phone.replace(/\s+/g, "");

  const platformLinks = [
    {
      label: dictionary.footer.navigation.home,
      href: `/${locale}/home`,
    },
    {
      label: dictionary.footer.navigation.announcements,
      href: `/${locale}/concours`,
    },
    {
      label: dictionary.footer.navigation.faq,
      href: `/${locale}/FAQ`,
    },
    {
      label: dictionary.footer.navigation.contact,
      href: `/${locale}/contact`,
    },
  ];

  const candidateLinks = [
    {
      label: dictionary.footer.candidateArea.start,
      href: `/${locale}/postuler`,
    },
    {
      label: dictionary.footer.candidateArea.completeFile,
      href: `/${locale}/candidature`,
    },
    {
      label: dictionary.footer.candidateArea.applications,
      href: `/${locale}/profile?section=candidatures`,
    },
    {
      label: dictionary.footer.candidateArea.profile,
      href: `/${locale}/profile?section=compte`,
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-600 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl text-gray-900">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                iR
              </div>
              <span>{themeConfig.templateName}</span>
            </div>
            <p className="text-sm leading-relaxed text-black-500 max-w-xs">
              {dictionary.footer.description}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <MapPin className="h-4 w-4" />
              </Link>
              <Link
                href={`tel:${phoneLink}`}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href={`mailto:${dictionary.contact.email}`}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/concours`}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Briefcase className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              {dictionary.footer.navigation.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Candidate Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              {dictionary.footer.candidateArea.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {candidateLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              {dictionary.footer.contactTitle}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  {dictionary.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <Link
                  href={`tel:${phoneLink}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  {dictionary.contact.phone}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <Link
                  href={`mailto:${dictionary.contact.email}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  {dictionary.contact.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black-500">
            © {new Date().getFullYear()} {themeConfig.templateName}. All rights
            reserved.
          </p>
          <p className="text-sm text-black-500 flex items-center gap-1">
            {dictionary.footer.poweredBy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
