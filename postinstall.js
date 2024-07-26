const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

// Define file paths
const PUBLIC_KEY_PATH = path.join(__dirname, "id_rsa_pub.pem");
const PRIVATE_KEY_PATH = path.join(__dirname, "id_rsa_priv.pem");
const ENV_FILE_PATH = path.join(__dirname, ".env");

// ANSI escape codes for styling
const styles = {
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

function genKeyPair() {
  try {
    // Generate RSA key pair
    const keyPair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096, // bits - standard for RSA keys
      publicKeyEncoding: {
        type: "pkcs1", // Public Key Cryptography Standards 1
        format: "pem", // Most common formatting choice
      },
      privateKeyEncoding: {
        type: "pkcs1", // Public Key Cryptography Standards 1
        format: "pem", // Most common formatting choice
      },
    });

    // Save public key to file
    fs.writeFileSync(PUBLIC_KEY_PATH, keyPair.publicKey);
    console.debug(
      `${styles.green}Public key saved to ${PUBLIC_KEY_PATH}${styles.reset}`,
    );

    // Save private key to file
    fs.writeFileSync(PRIVATE_KEY_PATH, keyPair.privateKey);
    console.debug(
      `${styles.green}Private key saved to ${PRIVATE_KEY_PATH}${styles.reset}`,
    );
  } catch (error) {
    console.error(
      `${styles.red}Error generating key pair: ${error.message}${styles.reset}`,
    );
  }
}

function setDATABASE_URL(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `${styles.blue}Please enter your PostgreSQL database connection URL. Example: "postgresql://<username>:<password>@localhost:5432/labguydb?schema=public"\n` +
      `URL: ${styles.reset}`,
    (dbUrl) => {
      try {
        fs.appendFileSync(ENV_FILE_PATH, `DATABASE_URL=${dbUrl}\n`);
        console.debug(
          `${styles.green}DATABASE_URL has been saved in .env file.`,
        );
      } catch (error) {
        console.error(
          `${styles.red}Error writing DATABASE_URL to .env file: ${error.message}${styles.reset}`,
        );
      } finally {
        rl.close();
        if (callback) callback();
      }
    },
  );
}

function init() {
  console.debug(
    `${styles.bold}${styles.blue}Starting Labguy server installation...${styles.reset}`,
  );
  genKeyPair();
  setDATABASE_URL(final);
}

function final() {
  console.debug(
    `${styles.bold}${styles.green}Installation complete. Make sure you keep PRIVATE KEY, DATABASE URL secret. Enjoy.${styles.reset}`,
  );
}

// Start the installation process
init();
