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
import { AlertWarning } from "@/components/alerts/AlertWarning";
import ValidationActionModal from "@/components/modals/ValidationActionModal";
import { useRouter } from "next/navigation";
import { useApplicationStore } from "@/stores/useApplication.store";

const InfoProfessionnelles = ({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  // State
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state

  // Hooks
  const { validateCandidature } = useCandidatureStore();
  const { selectedOffer } = useApplicationStore();

  const router = useRouter();

  const handleValidation = async () => {
    setLoading(true);
    const res = await validateCandidature();
    setLoading(false);
    setShowModal(false); // Close the modal after validation

    if (res === "success") {
      if (!selectedOffer) router.push(`/${locale}/concours`);
      else router.push(`/${locale}/postuler`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">
          {dictionary.candidature.sections.InfoProfessionnelles.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.candidature.sections.InfoProfessionnelles.description}
        </p>
      </div>
      <AlertWarning
        title={
          dictionary.candidature.sections.InfoProfessionnelles
            .important_information_title
        }
        message={
          dictionary.candidature.sections.InfoProfessionnelles
            .important_information_message
        }
      />
      <Separator />
      <DiplomesForm locale={locale} />
      <LanquesForm locale={locale} />
      <PublicationsForm locale={locale} />
      <CommunicationsForm locale={locale} />
      <div className="flex justify-end top-3">
        <Button
          size="lg"
          className="bg-green-500"
          disabled={loading}
          onClick={() => setShowModal(true)} // Show modal on button click
        >
          {loading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
          {dictionary.buttons.validate}
        </Button>
      </div>

      {/* Modal for validation */}
      <ValidationActionModal
        setShowModal={setShowModal}
        showModal={showModal}
        dictionary={dictionary}
        loading={loading}
        handleValidation={handleValidation}
      />
      {/* <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {
                dictionary.candidature.sections.InfoProfessionnelles
                  .confirm_title
              }
            </DialogTitle>
          </DialogHeader>
          <p>
            {
              dictionary.candidature.sections.InfoProfessionnelles
                .confirm_message
            }
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {dictionary.buttons.cancel}
            </Button>
            <Button
              variant="default"
              className="bg-green-500"
              disabled={loading}
              onClick={handleValidation}
            >
              {loading ? (
                <Loader className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {dictionary.buttons.validate}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default InfoProfessionnelles;
