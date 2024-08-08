import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import ejs from "ejs";
import { env } from "process";

// Function to send a reset email
export async function sendResetEmail(
  resetLink: string,
  to: any,
  creatorName: any
) {
  const templatePath = path.join(
    __dirname,
    "../templates/password-reset-email.ejs"
  );
  const template = fs.readFileSync(templatePath, "utf8");
  const message = ejs.render(template, { resetLink, creatorName });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: env.EMAIL_USER,
    to,
    subject: `Password Reset Request – ${creatorName} `,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    throw error;
  }
}
