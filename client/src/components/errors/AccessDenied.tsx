// components/errors/AccessDenied.tsx

"use client";
import { ShieldOff } from "lucide-react";
import { Button } from "../ui/button";

export default function AccessDenied({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <ShieldOff className="h-16 w-16 text-orange-500 mb-4" />
      <h2 className="text-3xl font-semibold text-orange-500 mb-2">
        Accès Refusé
      </h2>
      <p className="text-center mb-6 max-w-md text-black-500  ">{message}</p>
      <Button onClick={() => window.location.reload()} size="lg">
        Retourner
      </Button>
    </div>
  );
}
