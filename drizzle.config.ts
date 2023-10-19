import { cwd } from "node:process";
import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export default {
  schema: "./src/shared/lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
