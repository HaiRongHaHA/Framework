module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:jsdoc/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'jsdoc',
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    "no-console": "off",
    "linebreak-style": ["off", "windows"],
    "array-callback-return": "off",
    "consistent-return": "off",

    // jsdoc
    'jsdoc/check-indentation': 'error',

    // typescript-eslint
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',

    // eslint-plugin-import
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',

    // fix airbnb & other merge
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "e", // for e.returnvalue
          "state" // for vuex state
        ]
      }
    ]
  }
};
