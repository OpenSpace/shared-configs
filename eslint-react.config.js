// Shared ESLint configuration for React projects. It contains everything in `tsLint`
// plus the React rules.
//
// Use it in the `extends` of a config block, where it takes on the `files` and `ignores`
// of that block:
//
//   import { reactLint } from '@openspace/shared-configs/eslint/react';
//   export default tseslint.config({ files: ['**/*.{ts,tsx}'], extends: [reactLint] });
//
// The config registers the `simple-import-sort`, `react` and `react-refresh` plugins, so a
// project must not register them again
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';

import { tsLint } from './eslint.config.js';

// React rules
const reactRules = {
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'react/jsx-curly-brace-presence': [
    'error',
    {
      props: 'always',
      children: 'never',
      propElementValues: 'always'
    }
  ]
};

export const reactLint = [
  ...tsLint,
  {
    plugins: {
      react: react,
      'react-refresh': reactRefresh
    },
    rules: reactRules
  }
];
