import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Updated import to the correct package
import tsParser from "@typescript-eslint/parser"; // Added the TypeScript parser

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts, ejs}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, 
    },
  },

];
