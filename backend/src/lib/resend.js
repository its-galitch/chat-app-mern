import { Resend } from 'resend';
import "dotenv/config";


const { RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME } = process.env;

if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_FROM_NAME) {
  throw new Error('Missing required environment variables: RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME');
}

export const resendClient = new Resend(RESEND_API_KEY);


export const sender = {
  email : EMAIL_FROM,
  name : EMAIL_FROM_NAME
}

