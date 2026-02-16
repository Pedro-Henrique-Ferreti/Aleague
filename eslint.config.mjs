// @ts-check
import antfu from '@antfu/eslint-config';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu({
    ignores: ['public/**'],
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/member-delimiter-style': 'off',
      'style/semi': ['error', 'always'],
      'antfu/if-newline': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/first': 'off',
      'jsonc/sort-keys': 'off',
    },
  }),
  {
    rules: {
      'vue/prefer-separate-static-class': 'off',
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/attributes-order': ['error', {
        order: [
          'LIST_RENDERING',
          'CONDITIONALS',
          'DEFINITION',
          'CONTENT',
          'RENDER_MODIFIERS',
          'OTHER_DIRECTIVES',
          'TWO_WAY_BINDING',
          'SLOT',
          'UNIQUE',
          'GLOBAL',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'ATTR_DYNAMIC',
          'EVENTS',
        ],
      }],
    },
  },
);
