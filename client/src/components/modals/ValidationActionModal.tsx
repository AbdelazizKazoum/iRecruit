import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"; // Import Dialog components from ShadCN
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/utils/getDictionary";
import { Loader } from "lucide-react";

function ValidationActionModal({
  showModal,
  setShowModal,
  dictionary,
  loading,
  handleValidation,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleValidation: () => void;
}) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black-600/80">
            {dictionary.candidature.sections.InfoProfessionnelles.confirm_title}
          </DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-muted-foreground">
          {dictionary.candidature.sections.InfoProfessionnelles.confirm_message}
        </p>
        <DialogFooter className="gap-3">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {dictionary.buttons.cancel}
          </Button>
          <Button
            variant="default"
            className="bg-green-500"
            disabled={loading}
            onClick={handleValidation}
          >
            {loading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
            {dictionary.buttons.validate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ValidationActionModal;
