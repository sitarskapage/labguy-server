import { seed } from "./prisma/seed"; // Import seed but do not invoke it here
import crypto from "crypto";
import fs from "fs";
import readline from "readline";
import path from "path";

// Define file paths
const PUBLIC_KEY_PATH = path.join(__dirname, "id_rsa_pub.pem");
const PRIVATE_KEY_PATH = path.join(__dirname, "id_rsa_priv.pem");
const ENV_FILE_PATH = path.join(__dirname, ".env");

function logMessage(message: string, style: string = "\x1b[34m") {
  console.log(`${style}${message}\x1b[0m`);
}

function genKeyPair(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      logMessage("Generating RSA key pair...", "\x1b[34m");

      const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      fs.writeFileSync(PUBLIC_KEY_PATH, keyPair.publicKey);
      logMessage(`Public key saved to ${PUBLIC_KEY_PATH}`, "\x1b[32m");

      fs.writeFileSync(PRIVATE_KEY_PATH, keyPair.privateKey);
      logMessage(`Private key saved to ${PRIVATE_KEY_PATH}`, "\x1b[32m");

      resolve();
    } catch (error: any) {
      logMessage(`Error generating key pair: ${error.message}`, "\x1b[31m");
      reject(error);
    }
  });
}

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
}

async function setENV_VARIABLE(
  envVariableName: string,
  promptMessage: string,
): Promise<void> {
  try {
    const value = await askQuestion(promptMessage);
    fs.appendFileSync(ENV_FILE_PATH, `${envVariableName}="${value}"\n`);
    logMessage(`${envVariableName} has been saved in .env file.`, "\x1b[32m");
  } catch (error: any) {
    logMessage(
      `Error writing ${envVariableName} to .env file: ${error.message}`,
      "\x1b[31m",
    );
  }
}

async function init() {
  try {
    logMessage("Starting installation...", "\x1b[1m\x1b[34m");

    await genKeyPair();

    logMessage("Setting variables...", "\x1b[34m");

    await setENV_VARIABLE(
      "DATABASE_URL",
      "Please enter your PostgreSQL database connection URL: ",
    );
    await setENV_VARIABLE("ADMIN_EMAIL", "Please enter the admin email: ");

    logMessage("Seeding the database...", "\x1b[34m");

    // Invoke seed function after all other operations are complete
    await seed();

    logMessage(
      "Installation complete. Make sure you keep PRIVATE KEY and DATABASE URL secret.",
      "\x1b[1m\x1b[32m",
    );
  } catch (error) {
    logMessage("Installation encountered an error.", "\x1b[31m");
    console.error(error);
  }
}

// Start the installation process
init();
