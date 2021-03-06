const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: path.resolve(__dirname, './'),
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    curly: [2, 'multi-or-nest'],
    'dot-notation': 2,
    'no-const-assign': 2,
    'no-await-in-loop': 2,
    'no-cond-assign': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-empty': 2,
    'no-obj-calls': 2,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 2,
    'no-unreachable': 2,
    'use-isnan': 2,
    'callback-return': 2,
    'import/no-unresolved': 0,
    'prefer-destructuring': [
      2,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'require-await': 2,
    'handle-callback-err': 2,
    'no-new-require': 2,
    'default-param-last': 2,
    'no-extra-bind': 2,
    'no-dupe-class-members': 2,
    'no-else-return': 2,
    'no-inner-declarations': 2,
    'no-lonely-if': 2,
    'no-shadow': 2,
    'no-unneeded-ternary': 2,
    'no-var': 2,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-redeclare': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-loop-func': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      0,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'require-await': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-useless-return': 2,
    'one-var': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-template': 2,
    'require-yield': 2,
    'prefer-rest-params': 2,
    'prefer-promise-reject-errors': 2,
    'sort-imports': [
      2,
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys': [
      0,
      'asc',
      {
        caseSensitive: true,
        natural: true,
      },
    ],
    'sort-vars': 2,
    strict: [1, 'global'],
  },
};
