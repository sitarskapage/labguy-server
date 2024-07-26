import { readFileSync } from "fs";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

interface User {
  id: number;
  email: string;
}

function getPrivateKey(): string {
  const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
  const privateKey = readFileSync(pathToKey, "utf8");

  if (!privateKey) throw new Error("Server configuration error");

  return privateKey;
}

function createPayload(user: User) {
  return { sub: user.id, email: user.email };
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
  const payload = createPayload(user);
  const expiresIn = 60000 * 60; // 1 hour in milliseconds, 60000 = 1min

  const signedToken = signToken(payload, privateKey, expiresIn);

  return {
    token: signedToken,
    expires: expiresIn,
  };
}
