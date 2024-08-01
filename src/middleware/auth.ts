import { readFileSync } from "fs";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import path from "path";
import asyncHandler from "express-async-handler";
import { Request } from "express";

interface UserPayload {
  id: string;
  email: string;
}

function getPublicKey(): string {
  const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
  return readFileSync(pathToKey, "utf8");
}

function getTokenFromHeader(authHeader: string | undefined): string {
  if (!authHeader) throw new Error("Authorization header missing");

  const token = authHeader.split(" ")[1]; //token starts with "Bearer "

  if (!token) throw new Error("No auth token");

  return token;
}

function verifyToken(token: string): Promise<UserPayload> {
  const publicKey = getPublicKey();

  function isPayloadValid(decoded?: JwtPayload | string) {
    return (
      typeof decoded !== "object" ||
      !("sub" in decoded) ||
      !("email" in decoded)
    );
  }

  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      token,
      publicKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        // err?
        if (err) {
          return reject(new Error(err.message));
        }
        // Check if decoded data includes the necessary fields
        if (isPayloadValid(decoded)) {
          return reject(new Error("Invalid token payload"));
        }
        // Extract user info from the decoded payload
        const userPayload: UserPayload = {
          id: (decoded as any).sub,
          email: (decoded as any).email,
        };
        resolve(userPayload);
      },
    );
  });
}

// Define a variable with custom unprotected paths
const UNPROTECTED_PATHS = ["/signup"];

/**
 * Determines if a request is protected based on the method and path.
 *
 * @param req - The HTTP request object.
 * @returns boolean - True if the request is protected, otherwise false.
 */

function isProtectedReq(req: Request): boolean {
  if (req.method === "POST") {
    if (!UNPROTECTED_PATHS.some((path) => req.path.includes(path))) {
      return true;
    }
  }
  return false;
}

const authVerifyPOST = asyncHandler(async (req: Request, res, next) => {
  if (!isProtectedReq(req)) {
    return next();
  }
  //verify
  const token = getTokenFromHeader(req.headers.authorization);
  const user = await verifyToken(token);
  //attach user to request
  req.user = user;
  //next
  next();
});

const authVerify = asyncHandler(async (req: Request, res, next) => {
  //verify
  const token = getTokenFromHeader(req.headers.authorization);
  await verifyToken(token);
  //next
  next();
});

export { authVerify, authVerifyPOST, verifyToken };
