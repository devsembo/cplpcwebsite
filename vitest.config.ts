import { config } from "dotenv";
config({ path: ".env.local" });

import { defineConfig } from "vitest/config";
import path from "node:path";
import { createRequire } from "node:module";

// "server-only" lança um erro quando importado fora de um Server Component.
// Em testes (Node puro, fora do bundler do Next.js) apontamos para o
// stub vazio que o próprio pacote fornece para esse cenário.
const require = createRequire(import.meta.url);
const serverOnlyStub = path.join(path.dirname(require.resolve("server-only")), "empty.js");

export default defineConfig({
    test: {
        environment: "node",
        include: ["src/**/*.test.ts", "*.test.ts"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "server-only": serverOnlyStub,
        },
    },
});
