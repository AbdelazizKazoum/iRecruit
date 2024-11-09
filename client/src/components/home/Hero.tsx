"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";

const Hero = ({
  listUser = [
    {
      name: "Offres d'emploi",
      number: "10",
      icon: "/assets/Icon/heroicons_sm-jobs.svg",
    },
    {
      name: "Candidats",
      number: "450",
      icon: "/assets/Icon/gridicons_candidats.svg",
    },
    {
      name: "Entretiens planifiés",
      number: "80",
      icon: "/assets/Icon/bx_bxs-planning.svg",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-2xl mt-24 px-8 xl:px-16 mx-auto" id="accueil">
      <ScrollAnimationWrapper className={""}>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 :py-16"
          variants={scrollAnimation}
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Bienvenue Sur La Plateforme de <strong>recrutement</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Plateforme de recrutement dédiée au secteur de l&apos;Enseignement
              Supérieur, de la Recherche Scientifique et de l&apos;Innovation.
            </p>
            <ButtonPrimary addClass={""}>Lancez-vous</ButtonPrimary>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/assets/logoHome.png"
                alt="VPN Illustrasi"
                quality={100}
                width={612}
                height={383}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-500 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-primary-300/10 w-12 h-12 mr-6 rounded-full">
                  <Image
                    alt="icon"
                    src={listUsers.icon}
                    width={40}
                    height={40}
                    className="h-6 w-6 "
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
