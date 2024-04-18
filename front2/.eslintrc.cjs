const prettierOptions = require('./.prettierrc.cjs');

module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    '@vue/prettier',
  ],
  rules: {
    // Global
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'prettier/prettier': ['warn', prettierOptions],
    // Vue
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 0
  }
}
