import themeConfig from "@/configs/themeConfig";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
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
                href="#"
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              {dictionary.footer.navigationLinks.product.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                dictionary.footer.navigationLinks.product.download,
                dictionary.footer.navigationLinks.product.pricing,
                dictionary.footer.navigationLinks.product.locations,
                dictionary.footer.navigationLinks.product.servers,
                dictionary.footer.navigationLinks.product.countries,
                dictionary.footer.navigationLinks.product.blog,
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              {dictionary.footer.navigationLinks.engagement.title}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                dictionary.footer.navigationLinks.engagement.faq,
                dictionary.footer.navigationLinks.engagement.tutorials,
                dictionary.footer.navigationLinks.engagement.aboutUs,
                dictionary.footer.navigationLinks.engagement.privacyPolicy,
                dictionary.footer.navigationLinks.engagement.termsOfUse,
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (New Section) */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Business Avenue, Tech District,
                  <br />
                  Innovation City, 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-gray-600">
                  contact@irecruit.com
                </span>
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
            {dictionary.footer.poweredBy}{" "}
            <span className="text-primary font-medium">Abdelaziz Kazoum</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
