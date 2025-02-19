"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";
import { PlayCircle } from "lucide-react"; // Import Play icon from Lucide React
import { useRouter } from "next/navigation";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";
import { useCandidatureStore } from "@/stores/candidature.store";
import { listUser } from "@/data/navigation/hero";

const Hero = ({
  dictionary,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) => {
  // State
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  // Memos
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  // Hooks
  const router = useRouter();
  const { fetchCandidatureData } = useCandidatureStore();

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  const handleStartClick = async () => {
    setLoading(true); // Start loading
    const res = await fetchCandidatureData();

    if (
      res?.personalInformation?.valid ||
      res?.professionalInformation?.valid
    ) {
      router.push(`/${locale}/concours`);
    } else {
      router.push(`/${locale}/candidature`);
    }

    setLoading(false); // End loading
  };

  return (
    <div className="max-w-screen-2xl mt-24 px-8 xl:px-16 mx-auto" id="accueil">
      <ScrollAnimationWrapper className={""}>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 :py-16"
          variants={scrollAnimation}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              {dictionary["hero"].title}
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              {dictionary["hero"].description}
            </p>
            <div className="flex gap-3">
              <ButtonPrimary
                addClass={""}
                onClick={() => handleStartClick()}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    {/* Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  dictionary["hero"].button
                )}
              </ButtonPrimary>

              <div className="">
                {/* Play button with text next to it */}
                <button
                  className="  hover:bg-primary-600 transition-all flex items-center justify-center gap-2 "
                  onClick={handleVideoClick}
                >
                  <PlayCircle size={60} className="text-primary " />{" "}
                  {/* Play Icon */}
                  <p className=" text-primary font-semibold">
                    {dictionary["hero"].videoText}
                  </p>{" "}
                </button>

                {/* Text next to the button */}
              </div>
            </div>
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

      {/* YouTube Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
            <div className="absolute top-0 right-0 p-4">
              <button
                className="text-black-600 font-bold text-xl"
                onClick={() => setIsVideoOpen(false)}
              >
                X
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // Replace with your YouTube video ID
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-500 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto gap-2">
                <div className="flex items-center justify-center bg-primary-300/10 w-12 h-12 mr-6 rounded-full">
                  <Image
                    alt="icon"
                    src={listUsers.icon}
                    width={40}
                    height={40}
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">
                    {listUsers.name[locale]}
                  </p>
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
