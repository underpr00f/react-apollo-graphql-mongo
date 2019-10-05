require('dotenv').config()

export const siteURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.SITE_URL
// export const siteURL = "http://localhost:3000"