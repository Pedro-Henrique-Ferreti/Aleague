// @ts-check
import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: ['public/**'],
    rules: {
      'style/semi': 'off',
      'style/member-delimiter-style': 'off',
      'antfu/if-newline': 'off',
    }
  }),
  {
    rules: {
      'vue/require-default-prop': 'off',
      "vue/block-order": ["error", {
        "order": ["template", "script", "style"],
      }],
      "vue/attributes-order": ["error", {
        "order": [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "CONTENT",
          "RENDER_MODIFIERS",
          "OTHER_DIRECTIVES",
          "TWO_WAY_BINDING",
          "SLOT",
          "UNIQUE",
          "GLOBAL",
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'ATTR_DYNAMIC',
          "EVENTS",
        ],
      }]
    }
  }
)
