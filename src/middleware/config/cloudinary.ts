import { v2 as cloudinary } from "cloudinary";
import { env } from "process";

cloudinary.config({
  cloud_name: env.CLD_CLOUD_NAME,
  api_key: env.CLD_API_KEY,
  api_secret: env.CLD_API_SECRET,
});
