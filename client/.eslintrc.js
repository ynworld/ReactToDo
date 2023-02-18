module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'sort-keys-fix', 'prettier'],
  rules: {
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['block-like', 'const', 'let'],
      },
      { blankLine: 'any', next: ['const', 'let'], prev: ['const', 'let'] },
      { blankLine: 'always', next: ['block-like', 'return'], prev: '*' },
    ],
    'prettier/prettier': 'error',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-props-no-spreading': [2, { html: 'ignore' }],
    'react/jsx-sort-props': ['error', { reservedFirst: ['key', 'ref'] }],
    'react/jsx-uses-react': 'off',
    'react/no-multi-comp': ['error', { ignoreStateless: false }],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    semi: ['error', 'never'],
    'sort-keys': ['error', 'asc'],
    'sort-keys-fix/sort-keys-fix': 'error',
    'tailwindcss/no-custom-classname': [
      'error',
      {
        whitelist: ['(?!(group|peer)\\-).*'],
      },
    ],
  },
}
