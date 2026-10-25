import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db.js";
import { user, session, account, verification } from "../db/schema/auth-schema.js";
import { env } from 'process';

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET!,
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: { enabled: true },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  advanced: {
    // Disable strict CSRF origin check only in non-production environments
    disableOriginCheck: process.env.NODE_ENV !== "production"
  }
});