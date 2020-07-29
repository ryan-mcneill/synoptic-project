module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier", "react"],
  rules: {
    "react/prop-types": "off"
  }
};
