/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import React from "react";

const faqs = {
  title: "Foire Aux Questions (F.A.Q.)",
  description:
    "Retrouvez ici les réponses aux questions les plus fréquemment posées par nos utilisateurs.",
  questions: [
    {
      question: "Comment créer un compte ?",
      answer:
        "Vous pouvez créer un compte en cliquant sur le bouton 'S'inscrire' en haut à droite de la page et en remplissant le formulaire avec vos informations.",
    },
    {
      question: "Comment réinitialiser mon mot de passe ?",
      answer:
        "Cliquez sur 'Mot de passe oublié' sur la page de connexion, entrez votre adresse e-mail, et suivez les instructions pour réinitialiser votre mot de passe.",
    },
    {
      question: "Comment puis-je postuler à une offre ?",
      answer:
        "Connectez-vous à votre compte, recherchez une offre qui vous intéresse, puis cliquez sur 'Postuler' et suivez les étapes.",
    },
    {
      question: "Quels navigateurs sont pris en charge ?",
      answer:
        "Notre site est compatible avec les dernières versions de Google Chrome, Mozilla Firefox, Safari, et Microsoft Edge.",
    },
    {
      question: "Comment contacter le service client ?",
      answer:
        "Vous pouvez nous joindre via le formulaire de contact disponible sur la page 'Contactez-nous' ou en envoyant un e-mail à support@votresite.com.",
    },
    {
      question: "Puis-je modifier mes informations personnelles ?",
      answer:
        "Oui, vous pouvez modifier vos informations personnelles en accédant à la section 'Mon profil' après vous être connecté à votre compte.",
    },
    {
      question: "Comment suivre l’état de ma candidature ?",
      answer:
        "Après avoir postulé à une offre, vous pouvez suivre l’état de votre candidature dans la section 'Mes candidatures' de votre compte.",
    },
    {
      question: "Est-ce que mes données personnelles sont sécurisées ?",
      answer:
        "Oui, nous utilisons des technologies avancées pour assurer la sécurité de vos données personnelles conformément à notre politique de confidentialité.",
    },
    {
      question: "Comment supprimer mon compte ?",
      answer:
        "Pour supprimer votre compte, veuillez nous contacter via le formulaire de contact ou envoyer un e-mail à support@votresite.com avec une demande de suppression.",
    },
    {
      question: "Puis-je me désinscrire des e-mails promotionnels ?",
      answer:
        "Oui, vous pouvez vous désinscrire en cliquant sur le lien 'Se désabonner' présent en bas de chaque e-mail promotionnel que vous recevez.",
    },
  ],
};

const Page = () => {
  return (
    <div className="max-w-screen-2xl mt-24 pb-24 px-4 sm:px-8 xl:px-16 mx-auto">
      <div className="space-y-6 py-10 lg:p-10 pb-16">
        <PageHeader title={faqs.title} description={faqs.description} />
        <Separator className="my-6" />
        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.questions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Page;
