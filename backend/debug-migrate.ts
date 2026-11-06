import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
});

const db = drizzle(pool);

try {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });

  console.log("Migrations successful!");
} catch (error) {
  console.dir(error, { depth: null });
} finally {
  await pool.end();
}
