import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"; // Import Dialog components from ShadCN
import { Button } from "@/components/ui/button";

function ValidationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Veuillez compléter votre candidature</DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-muted-foreground">
          Avant de postuler à une offre, veuillez remplir toutes vos
          informations et les valider.
        </p>
        <DialogFooter>
          <Button onClick={onClose} variant="default">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ValidationModal;
