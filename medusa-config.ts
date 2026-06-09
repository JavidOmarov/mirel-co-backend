import { loadEnv, defineConfig } from "@medusajs/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const required = [
  "DATABASE_URL", "JWT_SECRET", "COOKIE_SECRET", "STOREFRONT_URL",
  "STRIPE_API_KEY", "STRIPE_WEBHOOK_SECRET",
  "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET",
  "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_ENDPOINT",
]
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
  modules: [
    {
      resolve: "@medusajs/payment-stripe",
      options: {
        apiKey: process.env.STRIPE_API_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },
    {
      resolve: "@medusajs/payment-paypal",
      options: {
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
        sandbox: process.env.PAYPAL_SANDBOX === "true",
      },
    },
    {
      resolve: "@medusajs/file-s3",
      options: {
        s3_url: process.env.R2_ENDPOINT,
        bucket: process.env.R2_BUCKET,
        region: "auto",
        access_key_id: process.env.R2_ACCESS_KEY_ID,
        secret_access_key: process.env.R2_SECRET_ACCESS_KEY,
      },
    },
  ],
})
