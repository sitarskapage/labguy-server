import { v2 as cloudinary } from "cloudinary";
import { env } from "process";

export function generateSignature(public_id: string, eager: string) {
  if (!env.CLD_API_SECRET) throw new Error("No CLD_API_SECRET found");

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, eager, public_id },
    env.CLD_API_SECRET,
  );
  return signature;
}
