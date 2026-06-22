import { v2 as cloudinary } from "cloudinary";

/**
 * Server-side Cloudinary client. The API secret must stay on the server.
 * Returns null when not configured yet so the app degrades gracefully
 * instead of throwing at import/build time.
 */
let configured = false;

export function getCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) return null;
  if (!configured) {
    cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
    configured = true;
  }
  return cloudinary;
}

/** Folder under which all site media is stored in Cloudinary. */
export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "ranknex";
