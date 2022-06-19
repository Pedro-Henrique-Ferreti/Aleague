/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
  ],
  "rules": {
    "no-trailing-spaces": 1,
    "semi": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "comma-dangle": ["error", "always-multiline"],
    "vue/first-attribute-linebreak": 0,
    "vue/html-indent": [1, 2, {
      "alignAttributesVertically": false,
    }],
    "vue/html-self-closing": [1, {
      "html": {
        "void": "always",
        "normal": "always",
        "component": "always",
      },
    }],
  },
  "env": {
    "vue/setup-compiler-macros": true,
  },
  "overrides": [
    {
      "files": [
        "cypress/integration/**.spec.{js,ts,jsx,tsx}",
      ],
      "extends": [
        "plugin:cypress/recommended",
      ],
    },
  ],
};
