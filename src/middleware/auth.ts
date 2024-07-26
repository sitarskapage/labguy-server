import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import asyncHandler from "express-async-handler";

function getPublicKey(): string {
  const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
  return readFileSync(pathToKey, "utf8");
}

function getTokenFromHeader(authHeader: string | undefined): string {
  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("No auth token");
  }

  return token;
}

function verifyToken(token: string, publicKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, publicKey, (err) => {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve();
    });
  });
}

const authVerify = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "POST") {
      const publicKey = getPublicKey();
      const token = getTokenFromHeader(req.headers.authorization);
      //verify
      await verifyToken(token, publicKey);
    }
    next();
  },
);

export { authVerify };
