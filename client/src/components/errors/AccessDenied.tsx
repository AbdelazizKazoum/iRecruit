// components/errors/AccessDenied.tsx

"use client";
import { ShieldOff } from "lucide-react";
import { Button } from "../ui/button";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <ShieldOff className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-3xl font-semibold text-red-600 mb-2">Accès Refusé</h2>
      <p className="text-center mb-6 max-w-md text-gray-600">
        Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page.
        Veuillez vérifier vos informations d&apos;identification ou contacter le
        support si vous pensez que c&apos;est une erreur.
      </p>
      <Button onClick={() => window.location.reload()} size="lg">
        Retourner
      </Button>
    </div>
  );
}
