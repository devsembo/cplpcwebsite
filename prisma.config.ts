import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL,
  },
});
