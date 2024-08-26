import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const MTclient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_END_POINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
