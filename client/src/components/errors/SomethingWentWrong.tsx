// components/errors/SomethingWentWrong.tsx

"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

export default function SomethingWentWrong({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <AlertTriangle className="h-16 w-16 text-orange-500 mb-4" />
      <h2 className="text-3xl font-semibold text-orange-500 mb-2">
        Une erreur est survenue
      </h2>
      <p className="text-center mb-6 max-w-md text-black-500">{message}</p>
      <Button onClick={() => window.location.reload()} size="lg">
        Réessayer
      </Button>
    </div>
  );
}
