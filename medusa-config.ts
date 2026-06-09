import { loadEnv, defineConfig } from "@medusajs/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const required = ["DATABASE_URL", "JWT_SECRET", "COOKIE_SECRET", "STOREFRONT_URL"]
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`)
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STOREFRONT_URL!,
      adminCors: process.env.STOREFRONT_URL!,
      authCors: process.env.STOREFRONT_URL!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },
  modules: [],
})
