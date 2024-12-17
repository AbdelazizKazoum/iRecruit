/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";

const useDynamicForm = (schema: any, category: string) => {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      prenom: "Abdelaziz",
      prenomAr: "عبدالعزيز",
      nom: "test",
      nomAr: "كزوم",
      adresse: "dr boughanim assads ouled teima",
      adresseAr: "دوار بوغانيم اصادص اولاد تايمة",
      lieuNaissance: "dqfsg",
      cin: "JT74799",
      dateNaissance: "2024-12-03T23:00:00.000Z",
      sexe: "masculin",
      situation: "celibataire",
      telephone: "0636888888",
      email: "akaka0303@gmail.com",
      experiences: {
        fonctionnaire: true,
        fonction: "gr",
        ppr: "66006/C",
      },
      situationDeHandicap: {},
      AncienCombattant: true,
      PupillesNation: true,
      files: {
        attestation: {},
        cinPdf: {},
        bacPdf: {},
        cvPdf: {},
      },
    },
  });

  const setFormData = useFormStore((state: any) => state.setFormData);

  const onSubmit = (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    const formData = new FormData();

    // Append each field in 'data' dynamically to formData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File || value instanceof Blob) {
          // If the field is a file or Blob, append it directly
          formData.append(key, value);
        } else if (typeof value === "object") {
          // Convert objects to JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          // Append other values as they are (ensure they are strings)
          formData.append(key, String(value));
        }
      }
    });

    setFormData(category, data); // Assuming setFormData accepts formData
  };

  return {
    onSubmit,
    form,
  };
};

export default useDynamicForm;
