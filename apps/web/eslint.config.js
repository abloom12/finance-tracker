import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { reactConfig } from '@acme/eslint-config';

export default defineConfig(reactConfig, {
  files: ['**/*.{ts,tsx}'],
  extends: [
    ...pluginQuery.configs['flat/recommended-strict'],
    ...pluginRouter.configs['flat/recommended'],
  ],
  languageOptions: { ecmaVersion: 2020, globals: globals.browser },
  rules: {
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allow: [
          {
            from: 'package',
            package: '@tanstack/router-core',
            name: 'Redirect',
          },
          {
            from: 'package',
            package: '@tanstack/router-core',
            name: 'NotFoundError',
          },
        ],
      },
    ],
  },
});
