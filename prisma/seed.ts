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
  try {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
      .pbkdf2Sync("admin", salt, 10000, 64, "sha512")
      .toString("hex");

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, salt, hash },
    });

    console.debug(
      `${styles.green}Admin user created with ${styles.blue} Email: "${email}", Password: "admin".${styles.reset}`,
    );
  } catch (error: any) {
    console.error(
      `${styles.red}Error creating admin user: ${error.message}${styles.reset}`,
    );
  }
}

export async function seed(): Promise<void> {
  try {
    let adminEmail = env.ADMIN_EMAIL;

    if (adminEmail) {
      await createAdmin(adminEmail);
    } else {
      throw new Error("No admin email provided.");
    }
  } catch (error: any) {
    console.error(`${styles.red}Error: ${error.message}${styles.reset}`);
    process.exit(1);
  }
}

seed();
