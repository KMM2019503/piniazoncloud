import { MTclient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";

export const sendVerficationEmail = async (email, token) => {
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
    throw new Error(`Error in sending Verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const receiver = [{ email }];
  try {
    const response = await MTclient.send({
      from: sender,
      to: receiver,
      template_uuid: "0d11878b-b811-45c6-9084-b99f1a28ab59",
      template_variables: {
        company_info_name: "PiniazOnCloud",
        name: username,
      },
    });
    console.log(
      "🚀 ~ sendWelcomeEmail ~ Welcome Mail successfully send:",
      response
    );
  } catch (error) {
    console.log("🚀 ~ sendWelcomeEmail ~ error:", error);
    throw new Error(`Error in sending Welcome email: ${error.message}`);
  }
};

export const sendResetPasswordEmail = async (email, resetPasswordURL) => {
  const receiver = [{ email }];

  try {
    // const response = await MTclient.send({
    //   from: sender,
    //   to: receiver,
    //   subject: "PiniazOnCloud - Reset Password Email",
    //   html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    //     "{resetURL}",
    //     resetPasswordURL
    //   ),
    //   category: "Email Verification",
    // });

    const response = await MTclient.send({
      from: sender,
      to: receiver,
      template_uuid: "73eff7ce-9ed0-4755-a449-3aa8f74a80de",
      template_variables: {
        user_email: email,
        pass_reset_link: resetPasswordURL,
      },
    });

    console.log(
      "🚀 ~ sendResetPasswordEmail ~ Reset Password Mail successfully send:",
      response
    );
  } catch (error) {
    console.log("🚀 ~ sendResetPasswordEmail ~ error:", error);
    throw new Error(`Error in sending reset password email: ${error.message}`);
  }
};

export const sendResetPasswordSuccessfulEmail = async (email) => {
  const receiver = [{ email }];

  try {
    const response = await MTclient.send({
      from: sender,
      to: receiver,
      subject: "PiniazOnCloud - Reset Password Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Email Verification",
    });

    console.log(
      "🚀 ~ sendResetPasswordSuccessfulEmail ~ Reset Password Successful Mail send:",
      response
    );
  } catch (error) {
    console.log("🚀 ~ sendResetPasswordSuccessfulEmail ~ error:", error);
    throw new Error(
      `Error in sendResetPasswordSuccessfulEmail: ${error.message}`
    );
  }
};
