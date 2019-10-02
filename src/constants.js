require('dotenv').config()

export const siteURL = process.env.NODE_ENV==="production" ? process.env.SITE_URL : "http://localhost:3000"
