import { betterAuth } from "better-auth";
import { admin, organization as organizationPlugin } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db.js";
import { user, session, account, verification, organization, member, invitation, organizationRole } from "../db/schema/auth-schema.js";
import { env } from 'process';
import { v7 as uuidv7 } from "uuid";
import { ac } from "./permissions.js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET!,
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: { enabled: true },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification, organization, member, invitation, organizationRole },
  }),
  advanced: {
    database: {
      // Provide a custom function to enforce UUID v7 across all tables
      // generateId: "uuid",
      generateId: () => uuidv7(),
    },
    // Disable strict CSRF origin check only in non-production environments
    disableOriginCheck: process.env.NODE_ENV !== "production"
  },
  plugins: [admin(), organizationPlugin({ 
            ac, // Must be defined in order for dynamic access control to work
            dynamicAccessControl: { 
              enabled: true, 
            }})]
});
