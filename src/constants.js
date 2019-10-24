if (typeof window === 'undefined') { require('dotenv').config(); }

export const siteURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.SITE_URL;
export const CLOUD_SETTINGS = {
  CLOUD_NAME: process.env.CLOUD_NAME,
  UPLOAD_PRESET: process.env.UPLOAD_PRESET
}