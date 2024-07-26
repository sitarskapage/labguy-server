import { readFileSync } from "fs";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

interface User {
  id: number;
}

function getPrivateKey(): string {
  const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
  const privateKey = readFileSync(pathToKey, "utf8");

  if (!privateKey) throw new Error("Server configuration error");

  return privateKey;
}

function createPayload(userId: number): { sub: number } {
  return { sub: userId };
}

function signToken(
  payload: object,
  privateKey: string,
  expiresIn: number,
): string {
  return jsonwebtoken.sign(payload, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });
}

export function issueJWT(user: User) {
  const privateKey = getPrivateKey();
  const payload = createPayload(user.id);
  const expiresIn = 60000 * 60; // 1 hour in milliseconds, 60000 = 1min

  const signedToken = signToken(payload, privateKey, expiresIn);

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}
