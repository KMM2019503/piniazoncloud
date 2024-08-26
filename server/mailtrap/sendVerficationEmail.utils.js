import { MTclient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerficationEmail = async (email, token) => {
  console.log("sendVerficationEmail running");
  const receiver = [{ email }];
  try {
    const response = await MTclient.send({
      from: sender,
      to: receiver,
      subject: "PiniazOnCloud - Cloud Image Storage -> Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("🚀 ~ sendVerficationEmail ~ error:", error.message);
  }
};
