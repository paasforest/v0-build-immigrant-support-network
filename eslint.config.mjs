import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // Allow the conventional "_unused" name for intentionally discarded values.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
    },
  },
  {
    // Generated shadcn/ui scaffolding (currently unused by the site). Keep visible as
    // warnings rather than rewriting vendor code; fix if any of it is put into use.
    files: ["components/ui/**", "hooks/**"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", ".data/**", "public/**", "next-env.d.ts", "tsconfig.tsbuildinfo"],
  },
]

export default config
