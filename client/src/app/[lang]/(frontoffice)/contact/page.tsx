import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/normal-forms/ContactForm";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader
          title="Contactez-nous"
          description="Vous avez des questions ou besoin d'aide ? Notre équipe est là pour vous répondre. N'hésitez pas à nous contacter via le formulaire ci-dessous ou par les moyens indiqués.
"
        />
        <Separator className="my-6" />
        <div className=" flex items-center justify-center bg-gray-50 p-6">
          <div className=" flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md border rounded-lg overflow-hidden">
              {/* Left Side: Contact Form */}
              <ContactForm />

              {/* Right Side: Contact Info */}
              <div className="bg-indigo-50 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Nos coordonnées
                  </h2>
                  <ul className="space-y-4 text-black-500">
                    <li className="flex items-center">
                      <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
                      <span>123 Rue de l&apos;Entreprise, Paris, France</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-6 h-6 text-indigo-600 mr-3" />
                      <span>+33 1 23 45 67 89</span>
                    </li>
                    <li className="flex items-center">
                      <Mail className="w-6 h-6 text-indigo-600 mr-3" />
                      <span>contact@votresite.com</span>
                    </li>
                  </ul>
                </div>

                {/* Call-to-Action Section */}
                <div className="mt-8 bg-primary/10 -100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-black-600/80 mb-4">
                    Restez connecté
                  </h3>
                  <p className="text-black-500 mb-6">
                    Abonnez-vous à notre newsletter pour recevoir des mises à
                    jour et des offres spéciales directement dans votre boîte de
                    réception.
                  </p>
                  <Button
                    variant={"outline"}
                    className=" px-4 py-2  transition"
                  >
                    S&apos;abonner à la newsletter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default page;
