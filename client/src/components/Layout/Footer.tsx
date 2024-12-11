import themeConfig from "@/configs/themeConfig";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const Footer = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  return (
    <div className="bg-gray-100 pt-20 pb-10">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Project Description */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <div className="h-8 w-auto mb-6" />
          <p className="mb-4">
            <strong className="font-medium">{themeConfig.templateName} </strong>{" "}
            {dictionary.footer.description}
          </p>
          <p className="text-gray-400 ">
            ©{new Date().getFullYear()} - {themeConfig.templateName}
          </p>
          <p className="text-gray-400 text-center">
            {dictionary.footer.poweredBy}{" "}
            <span className="font-semibold  ">Abdelaziz Kazoum</span>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            {dictionary.footer.navigationLinks.product.title}
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.download}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.pricing}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.locations}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.servers}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.countries}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.product.blog}{" "}
            </li>
          </ul>
        </div>

        {/* Engagement Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            {dictionary.footer.navigationLinks.engagement.title}
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.why}{" "}
              {themeConfig.templateName} ?
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.faq}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.tutorials}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.aboutUs}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.privacyPolicy}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.engagement.termsOfUse}{" "}
            </li>
          </ul>
        </div>

        {/* Partnership Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            {dictionary.footer.navigationLinks.opportunities.title}{" "}
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.opportunities.affiliation}{" "}
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              {dictionary.footer.navigationLinks.opportunities.becomePartner}{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
