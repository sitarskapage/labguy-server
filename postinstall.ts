import { seed } from "./prisma/seed"; // Import seed but do not invoke it here
import crypto from "crypto";
import fs from "fs";
import path from "path";

const PUBLIC_KEY_PATH = path.join(__dirname, "id_rsa_pub.pem");
const PRIVATE_KEY_PATH = path.join(__dirname, "id_rsa_priv.pem");

function genKeyPair(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
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

      fs.writeFileSync(PRIVATE_KEY_PATH, keyPair.privateKey);

      resolve();
    } catch (error: any) {
      reject(error);
    }
  });
}

async function init() {
  await genKeyPair();
}

// Start the installation process
init();
