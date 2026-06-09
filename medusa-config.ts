import { loadEnv, defineConfig } from "@medusajs/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

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
