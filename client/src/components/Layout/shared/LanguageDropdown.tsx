import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Locale } from "@/configs/i18n";
import { cn } from "@/libs/utils";

type LanguageDataType = {
  langCode: Locale;
  langName: string;
};

const getLocalePath = (pathName: string, locale: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");

  segments[1] = locale;

  return segments.join("/");
};

// Vars
const languageData: LanguageDataType[] = [
  {
    langCode: "en",
    langName: "English",
  },
  {
    langCode: "fr",
    langName: "French",
  },
  {
    langCode: "ar",
    langName: "Arabic",
  },
];
export function LanguageDropdown() {
  // Hooks
  const pathName = usePathname();
  const { lang } = useParams();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Wrap the UserAvatar in a button but style it to appear as the avatar itself */}
        <div className="w-10 h-10 flex">
          <Button variant="ghost" className="p-0 rounded-full h-full w-full">
            <Languages style={{ width: "1.5rem", height: "1.5rem" }} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2">
        <DropdownMenuGroup>
          {languageData.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={cn(
                "cursor-pointer  ",
                lang === item.langCode && " bg-primary-500/15 text-primary "
              )}
              onClick={() =>
                router.push(getLocalePath(pathName, item.langCode))
              }
            >
              {item.langName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
