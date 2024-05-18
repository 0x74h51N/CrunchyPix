import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import pluginUnusedImports from "eslint-plugin-unused-imports";

const { configs: tsConfigs } = eslintPluginTypescript;

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  tsConfigs.recommended,
  pluginReact.configs.recommended,
  pluginJsxA11y.configs.recommended,
  pluginImport.configs.errors,
  pluginImport.configs.warnings,
  pluginImport.configs.typescript,
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": eslintPluginTypescript,
      "jsx-a11y": pluginJsxA11y,
      "import": pluginImport,
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/order": ["error", { "newlines-between": "always" }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-no-bind": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
