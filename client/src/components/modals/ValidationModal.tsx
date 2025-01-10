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

function ValidationModal({
  open,
  onClose,
  dictionary,
}: {
  open: boolean;
  onClose: () => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dictionary.application.modal.title}</DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-muted-foreground">
          {dictionary.application.modal.description}
        </p>
        <DialogFooter>
          <Button onClick={onClose} variant="default">
            {dictionary.application.modal.continue}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ValidationModal;
