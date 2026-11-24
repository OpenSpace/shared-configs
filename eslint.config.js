// Shared ESLint configuration for TypeScript projects.
//
// Use it in the `extends` of a config block, where it takes on the `files` and `ignores`
// of that block:
//
//   import { tsLint } from '@openspace/shared-configs/eslint';
//   export default tseslint.config({ files: ['**/*.ts'], extends: [tsLint], rules: { ... } });
//
// React projects use `reactLint` from `@openspace/shared-configs/eslint/react` instead.
// The config registers the `simple-import-sort` plugin, so a project must not register it
// again
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

// Rules that guard against common mistakes
const guardRules = {
  'no-duplicate-imports': 'error', // Imports should be on one line
  'no-self-compare': 'error',
  'no-unreachable-loop': 'error',
  'no-template-curly-in-string': 'error', // Catches "${}" template strings
  'default-case': ['error', { commentPattern: '^skip\\sdefault' }], // require default switch case
  'default-case-last': 'error' // enforce default switch case last
};

// Import ordering and destructuring
const styleRules = {
  'prefer-destructuring': ['error', { object: true, array: true }],
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // Packages `react` related packages come first.
        ['^react', '^@?\\w'],
        // Internal packages.
        ['^(@|components)(/.*|$)'],
        // Side effect imports.
        ['^\\u0000'],
        // Parent imports. Put `..` last.
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        // Other relative imports. Put same-folder imports and `.` last.
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        // Style imports.
        ['^.+\\.?(css)$']
      ]
    }
  ]
};

export const tsLint = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // Disallow usage of any
      ...guardRules,
      ...styleRules
    }
  }
];
