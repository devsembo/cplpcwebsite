import nextConfig from "eslint-config-next";

// `eslint-config-next` já exporta configuração flat nativa do ESLint 9
// (ver node_modules/eslint-config-next/dist/index.js). Usar FlatCompat
// aqui causava "TypeError: Converting circular structure to JSON" ao
// tentar validar a config legada através do shim de compatibilidade.
const eslintConfig = [...nextConfig];

export default eslintConfig;
