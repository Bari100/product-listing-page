module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    'plugin:jsx-a11y/strict',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['jsx-a11y', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-useless-rename': [
      'warn',
      {
        ignoreDestructuring: true,
        ignoreImport: true,
        ignoreExport: true,
      },
    ],
    'no-console': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 1,
    'react/prop-types': ['off'],
    'jsx-a11y/no-autofocus': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
