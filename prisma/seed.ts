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
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync("admin", salt, 10000, 64, "sha512")
    .toString("hex");

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, salt, hash },
  });

  console.log(
    `${styles.green}Admin user upsert with ${styles.blue} Email: "${email}", Password: "admin".${styles.reset}`,
  );
}

async function createPreferences(): Promise<void> {
  // Check if preferences already exist
  const existingPreferences = await prisma.preferences.findFirst();
  if (existingPreferences) {
    console.log("Preferences already exist. Skipping seed.");
    return;
  }

  // Create default preferences
  await prisma.preferences.create({
    data: {
      creator_name: "Creator Name",
      homepage_heading: "Homepage",
      homepage_subheading: "Sub-Heading",
      enable_dashboard_darkmode: false,
      enable_portfolio_pdf: false,
    },
  });
}

export async function seed(): Promise<void> {
  try {
    let adminEmail = env.ADMIN_EMAIL;

    if (adminEmail) {
      await createAdmin(adminEmail);
    } else {
      console.error(
        `${styles.red}No admin email provided. Skipping admin creation.${styles.reset}`,
      );
    }

    await createPreferences();
  } catch (error: any) {
    console.error(`${styles.red}Error: ${error.message}${styles.reset}`);
    process.exit(1);
  }
}

seed();
