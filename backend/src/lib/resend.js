import { Resend } from 'resend';
import "dotenv/config";


const { RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME } = process.env;
export const resendClient = new Resend(RESEND_API_KEY);


export const sender = {
  email : EMAIL_FROM,
  name : EMAIL_FROM_NAME
}

