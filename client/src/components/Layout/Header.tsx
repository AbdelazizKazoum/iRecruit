"use client";

import React, { useState, useEffect } from "react";
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { UserDropdown } from "../profile/UserDropdown";
import { HelpCircle, Home, Phone, StepForward, BookCopy } from "lucide-react";

// Menu links array with icons and labels
const menuLinks = [
  { label: "Accueil", path: "/home", icon: <Home /> },
  { label: "Annonces de concours", path: "/concours", icon: <BookCopy /> },
  { label: "FAQ", path: "/FAQ", icon: <HelpCircle /> },
  { label: "Contact", path: "/contact", icon: <Phone /> },
];

const Header = ({ user }: { user: Session["user"] | null | undefined }) => {
  const [activeLink, setActiveLink] = useState("");
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    // Update active link based on the current route
    setActiveLink(window.location.pathname);

    // Add scroll listener
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-50 bg-white-500 transition-all border-b-2 " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-2xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <div className="h-10 w-48 relative">
              <Link href="/home">
                <Image
                  src="/assets/logo-ministere.png"
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </Link>
            </div>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500 items-center">
            {menuLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={
                  "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                  (activeLink === link.path
                    ? " text-primary-500 animation-active "
                    : " text-black-500 hover:text-primary-500 ")
                }
                onClick={() => setActiveLink(link.path)}
              >
                {link.label}
              </Link>
            ))}
            <LinkScroll
              activeClass="active"
              to="etapes"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink("etapes")}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "etapes"
                  ? " text-primary-500 animation-active "
                  : " text-black-500 hover:text-primary-500 ")
              }
            >
              Les étapes à suivre
            </LinkScroll>
          </ul>
          {user ? (
            <div className="col-start-10 col-end-12 flex justify-end items-center">
              <div className="relative">
                <UserDropdown />
              </div>
            </div>
          ) : (
            <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
              <Link href="/login">
                <ButtonOutline>Connexion</ButtonOutline>
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            {menuLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setActiveLink(link.path)}
                className={
                  "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === link.path
                    ? " border-primary-500 text-primary-500"
                    : " border-transparent")
                }
              >
                <div className="flex flex-col gap-1 items-center ">
                  <span className="w-6 h-6">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
            <LinkScroll
              activeClass="active"
              to="etapes"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink("etapes")}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "etapes"
                  ? " border-primary-500 text-primary-500"
                  : " border-transparent")
              }
            >
              <div className="flex flex-col gap-1 items-center ">
                <span className="w-6 h-6 text-black-600/80 ">
                  {<StepForward />}
                </span>
                <span> Les étapes</span>
              </div>
            </LinkScroll>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
