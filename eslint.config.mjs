import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Photos ship as hand-sized files with their own srcset; the site is a static export with no image optimiser.
      "@next/next/no-img-element": "off",
      // Page copy is full of apostrophes and quotes; escaping them all would make the text unreadable to edit.
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The calendar Worker has its own tests (calendar/, npm test).
    "calendar/**",
    "dist/**",
  ]),
]);

export default eslintConfig;
