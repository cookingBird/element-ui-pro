module.exports = [
  {
    root: true,
    env: {
      node: false,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'error',
    },
    overrides: [
      {
        files: ['*.vue'],
        parser: 'vue-eslint-parser',
        parserOptions: {
          parser: {
            // Script parser for `<script>`
            'js': 'espree',
            // Script parser for `<script lang="ts">`
            'ts': '@typescript-eslint/parser',
            // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
            // and vue interpolations (e.g. `{{variable}}`).
            // If not specified, the parser determined by `<script lang ="...">` is used.
            '<template>': 'espree',
          },
          sourceType: 'module',
        },
      },
    ],
  },
];
