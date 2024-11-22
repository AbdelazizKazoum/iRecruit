import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Left Side: Contact Form */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contactez-nous
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom complet
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Entrez votre nom"
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adresse e-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Entrez votre email"
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Entrez votre message"
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      rows="4"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
                  >
                    Envoyer
                  </button>
                </form>
              </div>

              {/* Right Side: Contact Info */}
              <div className="bg-indigo-50 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                    Nos coordonnées
                  </h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center">
                      <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
                      <span>123 Rue de l'Entreprise, Paris, France</span>
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
                <div className="mt-8 bg-indigo-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-4">
                    Restez connecté
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Abonnez-vous à notre newsletter pour recevoir des mises à
                    jour et des offres spéciales directement dans votre boîte de
                    réception.
                  </p>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                    S'abonner à la newsletter
                  </button>
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
