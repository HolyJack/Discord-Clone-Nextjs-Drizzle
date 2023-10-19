import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
export * from "./schema";

const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

await client.connect();

export const db = drizzle(client, { schema });
