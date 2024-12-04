/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-airbnb-with-typescript',
  ],
  rules: {
    // eslint rules
    'quotes': [2, 'single'],
    'semi': 2,
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'camelcase': 2,
    'linebreak-style': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-restricted-globals': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // vue.js rules
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'always',
        'component': 'always',
      },
    }],
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/no-setup-props-destructure': 'off',
  },
  parserOptions: {
    'ecmaVersion': 'latest',
  },
};
