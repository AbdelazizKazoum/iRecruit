import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleWarning } from "lucide-react";

export function AlertWarning({
  message,
  title,
}: {
  title?: string;
  message: string;
}) {
  return (
    <Alert className=" bg-yellow-50 border-none  ">
      <div className="flex gap-2">
        <MessageCircleWarning className="h-4 w-4 text-yellow-400" />
        <AlertTitle className="text-yellow-800">{title}</AlertTitle>
      </div>

      <AlertDescription className=" text-yellow-700 mt-2">
        {message}
      </AlertDescription>
    </Alert>
  );
}
