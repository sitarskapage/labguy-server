import crypto from "crypto";
import { env } from "process";
import { prisma } from "../src/prismaclient";

// ANSI escape codes for styling
export const styles = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  underline: "\x1b[4m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

async function createAdmin(email: string): Promise<void> {
  const password = "admin";
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  let user = await prisma.user.findFirst();

  if (user) {
    return console.log(`Admin ${user.id} already exist. Skipping seed.`);
  }

  user = await prisma.user.create({
    data: { email, salt, hash },
  });

  console.log(
    `${styles.green}Admin ${user.id} created with ${styles.blue} Email: "${user.email}", Password: "${password}".${styles.reset}`
  );
}

async function createPreferences(): Promise<void> {
  const preferences = await prisma.preferences.findFirst();

  if (preferences) {
    return console.log("Preferences already exist. Skipping seed.");
  }

  await prisma.preferences.create({
    data: {
      artists_name: "Artist's Name",
      homepage_heading: "Homepage",
      homepage_subheading: "Sub-Heading",
      enable_dashboard_darkmode: true,
      enable_portfolio_pdf: false,
    },
  });

  console.log(`Preferences created.`);
}

async function createProfile(): Promise<void> {
  const userId = 1;

  // Check if the profile already exists
  const existingProfile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    console.log(`Profile for user ${userId} already exists. Skipping seed.`);
    return;
  }

  // Create profile first
  const profile = await prisma.profile.create({
    data: {
      statement: "This is a sample statement.",
      additional: JSON.stringify({ html: "" }),
      portfolio_pdf_url: "https://example.com/portfolio.pdf",
      userId: userId,
    },
  });

  // Create contact and social media
  const contact = await prisma.contact.create({
    data: {
      email: "example@example.com",
      socialmedia: {
        create: [
          {
            platform: "Twitter",
            profileUrl: "https://twitter.com/example",
            username: "example",
          },
          {
            platform: "LinkedIn",
            profileUrl: "https://linkedin.com/in/example",
            username: "example",
          },
        ],
      },
      profileId: profile.userId,
    },
  });

  // Update profile to link it to the contact
  await prisma.profile.update({
    where: { userId: profile.userId },
    data: {
      contact: {
        connect: { id: contact.id },
      },
    },
  });

  console.log(`Profile for user ${userId} created.`);
}

export async function seed(): Promise<void> {
  try {
    let adminEmail = env.ADMIN_EMAIL;

    if (adminEmail) {
      await createAdmin(adminEmail);
    } else {
      console.error(
        `${styles.red}No admin email provided. Skipping admin creation.${styles.reset}`
      );
    }

    await createPreferences();
    await createProfile();
  } catch (error: any) {
    console.error(`${styles.red}Error: ${error.message}${styles.reset}`);
    process.exit(1);
  }
}

seed();
