// Shared Prettier configuration. Use it from a project's package.json:
//
//   "prettier": "@openspace/shared-configs/prettier"

/** @type {import("prettier").Config} */
export default {
  printWidth: 90,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  endOfLine: 'auto'
};
