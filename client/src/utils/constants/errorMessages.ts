// utils/constants/errorMessages.ts

export const ERROR_MESSAGES = {
  SOMETHING_WENT_WRONG: {
    name: "SOMETHING_WENT_WRONG",
    code: 500,
    message: "Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
  },
  NOT_FOUND: {
    name: "NOT_FOUND",
    code: 404,
    message: "La page que vous cherchez n'existe pas.",
  },
  ACCESS_DENIED: {
    name: "ACCESS_DENIED",
    code: "401",
    message: "Accès refusé. Vous n'avez pas l'autorisation de voir cette page.",
  },
};
