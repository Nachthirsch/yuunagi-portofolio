module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended", "next/core-web-vitals"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "18.2",
    },
  },
  plugins: ["react-refresh", "react"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "react/jsx-no-undef": "off",
    "no-undef": "warn",
    "react/no-unknown-property": "off",
    "react/jsx-no-target-blank": "off",
    "react/no-unescaped-entities": "off",
  },
};
