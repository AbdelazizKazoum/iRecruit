import { Alert, AlertDescription } from "@/components/ui/alert";

export function AlertDestructive({
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <Alert
      variant="destructive"
      className="bg-orange-100 flex justify-center items-center"
    >
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
