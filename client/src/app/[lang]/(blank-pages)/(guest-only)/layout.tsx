import Providers from "@/components/Providers";
import { Locale } from "@/configs/i18n";
import GuestOnlyRoute from "@/hocs/GuestOnlyRoute";
import { ChildrenType } from "@/types/types";

const Layout = async ({
  children,
  params,
}: ChildrenType & { params: { lang: Locale } }) => {
  return (
    <Providers>
      <GuestOnlyRoute lang={params.lang}>{children}</GuestOnlyRoute>
    </Providers>
  );
};

export default Layout;
