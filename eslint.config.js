// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import prettiereslint from "eslint-plugin-prettier/recommended"

export default tseslint.config({
    files: ["**/*.ts", "**/*.tsx"],

    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
        eslintJs.configs.recommended,
        tseslint.configs.recommended,
        eslintReact.configs["recommended-typescript"],
        prettiereslint
    ],

    ignores: ["build/*"],

    // Configure language/parsing options
    languageOptions: {
        // Use TypeScript ESLint parser for TypeScript files
        parser: tseslint.parser,
        parserOptions: {
            // Enable project service for better TypeScript integration
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
});