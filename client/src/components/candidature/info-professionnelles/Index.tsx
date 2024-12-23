import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import DiplomesForm from "./DiplomesForm";
import { Locale } from "@/configs/i18n";
import LanquesForm from "./LanquesForm";
import PublicationsForm from "./PublicationsForm";
import CommunicationsForm from "./CommunicationsForm";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/utils/getDictionary";
import { useCandidatureStore } from "@/stores/candidature.store";
import { Loader } from "lucide-react";

const InfoProfessionnelles = ({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const [loading, setLoading] = useState(false);

  // Hooks
  const { validateCandidature } = useCandidatureStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">Application </h3>
        <p className="text-sm text-muted-foreground">
          Cest ainsi que les autres vous verront sur le site.
        </p>
      </div>
      <Separator />
      <DiplomesForm locale={locale} />
      <LanquesForm locale={locale} />
      <PublicationsForm locale={locale} />
      <CommunicationsForm locale={locale} />
      <div className=" flex justify-end top-3 ">
        <Button
          size="lg"
          className="bg-green-500"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await validateCandidature();
            setLoading(false);
          }}
        >
          {loading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
          {dictionary.buttons.validate}
        </Button>
      </div>
    </div>
  );
};

export default InfoProfessionnelles;
