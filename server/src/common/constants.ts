/* eslint-disable prettier/prettier */
export const jwtConstants = {
  secret: '05ce529ce5de3828e5d1742fda300a9765fc14f8feb01b51a2bbef1f110695da', // Use a secure secret key here
};

export const SendGridConstants = {
  API_KEY: process.env.SENDGRID_API_KEY,
};

export const BrevoConstants = {
  API_KEY: process.env.BREVO_API_KEY,
  SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL || 'noreply@irecruit.com',
  SENDER_NAME: process.env.BREVO_SENDER_NAME || 'iRecruit Team',
};
