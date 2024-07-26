import { randomBytes, pbkdf2Sync, BinaryLike } from "crypto";
import validator from "validator";

export function validEmail(email: string) {
  return validator.isEmail(email);
}

export function genPassword(password: BinaryLike) {
  const salt = randomBytes(32).toString("hex");
  const genHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
    "hex",
  );

  return {
    salt: salt,
    hash: genHash,
  };
}

export function validPassword(
  password: BinaryLike,
  hash: string,
  salt: BinaryLike,
) {
  const hashVerify = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
    "hex",
  );
  return hash === hashVerify;
}
