import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { env } from "process";

// Function to get the email template
function getEmailTemplate() {
  const filePath = path.join(__dirname, "password-reset-email.hbs");
  return fs.readFileSync(filePath, "utf8");
}

// Function to send a reset email
export async function sendResetEmail(
  resetLink: string,
  to: string,
): Promise<void> {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.ADMIN_EMAIL_PASSWORD,
    },
  });

  // Read and compile the email template
  const templateSource = getEmailTemplate();
  const template = Handlebars.compile(templateSource);
  const message = template({ resetLink });

  // Define the mail options
  const mailOptions = {
    from: env.EMAIL_USER,
    to: to,
    subject: "Password Reset Request",
    text: message,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send password reset email to ${to}:`, error);
    throw new Error("Failed to send password reset email.");
  }
}
