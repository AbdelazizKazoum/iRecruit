"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./Avatar";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation"; // Correct import for App Directory (useParams, useRouter)
import { LogOutIcon, Settings, UserIcon } from "lucide-react";

export function UserDropdown() {
  const router = useRouter(); // Only use the one from next/navigation
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Wrap the UserAvatar in a button but style it to appear as the avatar itself */}
        <Button variant="ghost" className="p-0 rounded-full">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex gap-2 justify-center items-center py-3 px-6 ">
          <UserAvatar />
          <div className="flex flex-col">
            <p className="font-medium text-black-500">Kazoum Abdelaziz</p>
            <span className=" text-sm text-gray-400  ">
              abdukazoum@gmail.com
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/${params.lang}/profile`)} // Navigates to the profile page
          >
            <UserIcon />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/settings")} // Navigates to the settings page
          >
            <Settings />
            Settings
          </DropdownMenuItem>

          <div className="mx-2 my-2 ">
            <Button
              variant="destructive"
              className="w-full h-8 [\&_svg\]:size-2"
              onClick={() => {
                signOut({ callbackUrl: `/${params.lang}/login` }); // Sign out the user
              }}
            >
              <p>Sign out</p> <LogOutIcon className="h-2" />
            </Button>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
