const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  ignorePatterns: ["*.js", "**/vendor/*.js"],
  rules: {
    "quotes": [2, "single", { "avoidEscape": true }],
    "prettier/prettier": "error",
    "react/jsx-key": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
};
