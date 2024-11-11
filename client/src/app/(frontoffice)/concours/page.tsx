import { AlbumArtwork } from "@/components/concours/album-atwork";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "@/libs/actions/candidateActions";
import { auth } from "@/libs/auth";
import { UserType } from "@/types/user.types";
import { CustomError } from "@/utils/errors/CustomError";
import React from "react";

export const madeForYouAlbums = [
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];

const Concours = async () => {
  const session = await auth();
  let user: UserType | null = null;

  const res = await getUserProfile(session?.user.email || "");
  if (!res.success) {
    throw new CustomError("401");
  }

  user = res.data;

  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title="Annonces de Concours"
          description="Consultez les dernières annonces de concours et postulez aux offres qui correspondent à votre profil."
        />
        {/* <header className="space-y-0.5">
          <h2 className="text-2xl font-bold text-black-600/90">
            
          </h2>
          <p className="text-muted-foreground">
          </p>
        </header> */}
        <Separator className="my-6" />
        <div defaultValue="music" className="h-full space-y-6">
          <div className="border-none p-0 outline-none">
            <div className="relative">
              <div>
                <div className="flex space-x-4 pb-4">
                  {madeForYouAlbums.map((album) => (
                    <AlbumArtwork
                      key={album.name}
                      album={album}
                      className="w-[150px]"
                      aspectRatio="square"
                      width={150}
                      height={150}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concours;
