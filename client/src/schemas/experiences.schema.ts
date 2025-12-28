import { z } from "zod";

export const experiencesSchema = z.object({
  position: z.string().min(1, "Veuillez indiquer le poste."),
  company: z.string().min(1, "Veuillez indiquer l'entreprise."),
  startDate: z.string().min(1, "Veuillez indiquer la date de début."),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().optional(),
  highlights: z.string().optional(), // newline or comma separated tasks/achievements
});
