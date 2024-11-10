// components/errors/NotFound.tsx

"use client";
import { AlertOctagon } from "lucide-react";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <AlertOctagon className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-3xl font-semibold text-red-600 mb-2">
        Page Introuvable
      </h2>
      <p className="text-center mb-6 max-w-md text-gray-600">
        La page que vous cherchez est introuvable. Veuillez vérifier l&apos;URL
        ou retourner à l&apos;accueil.
      </p>
      <Button onClick={() => window.location.reload()} size="lg">
        Retour à l&apos;accueil
      </Button>
    </div>
  );
}
