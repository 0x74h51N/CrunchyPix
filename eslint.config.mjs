import globals from "globals";
import pluginJs from "@eslint/js";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  { 
    languageOptions: { 
      globals: globals.browser,
      parser: "@typescript-eslint/parser",
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
  pluginReactConfig,
  jsxA11y.configs.recommended,
  importPlugin.configs.errors,
  importPlugin.configs.warnings,
  importPlugin.configs.typescript,
  {
    plugins: {
      react: "eslint-plugin-react",
      "react-hooks": "eslint-plugin-react-hooks",
      "@typescript-eslint": "eslint-plugin-typescript",
      "jsx-a11y": "eslint-plugin-jsx-a11y",
      "import": "eslint-plugin-import",
      "unused-imports": "eslint-plugin-unused-imports",
      "performance": "eslint-plugin-performance",
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/order': ['error', { 'newlines-between': 'always' }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-no-bind': 'warn',
      'performance/no-try-catch': 'warn',
      'performance/no-complex-iterable': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
];