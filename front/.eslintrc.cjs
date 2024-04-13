const prettierOptions = require('./.prettierrc.cjs');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'eslint:recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
    ],
    'plugins': ['simple-import-sort'],
    parserOptions: {
        ecmaVersion: 2021,
        project: './tsconfig.json',
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'after-used',
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'import/no-cycle': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': 'error',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': 'off',
        /**
         * Turned off, because showing error of "ref" undefined, but this exists in auto-imports.d.ts
         */
        'no-undef': 'off',
        'no-case-declarations': 'off',
        'prettier/prettier': ['warn', prettierOptions],
        'no-param-reassign': 'off',
        'default-case': 'off',
    },
    "overrides": [
        // override "simple-import-sort" config
        {
            "files": ["*.ts", "*.vue"],
            "rules": {
                "simple-import-sort/imports": [
                    "error",
                    {
                        "groups": [
                            // Packages `react` related packages come first.
                            ["^vue", "^@?\\w"],
                            // Internal packages.
                            ["^(@|components)(/.*|$)"],

                            // Side effect imports.
                            ["^\\u0000"],

                            // Types
                            ["^#"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Enums
                            ["^~/enums"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Utils
                            ["^~/utils"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Store
                            ["^~/store"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Composables
                            ["^~/composables"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Components
                            ["^~/components"],
                            // Side effect imports.
                            ["^\\u0000"],

                            // Parent imports. Put `..` last.
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            // Style imports.
                            ["^.+\\.?(css)$"]
                        ]
                    }
                ]
            }
        }
    ]
};
