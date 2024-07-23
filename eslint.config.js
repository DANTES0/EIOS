import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs[
        ('flat/essential', 'flat/strongly-recommended', 'flat/recommended')
    ],
    pluginPrettierRecommended,
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            'vue/padding-line-between-blocks': ['error', 'always'],
            'vue/enforce-style-attribute': ['error', { allow: ['scoped'] }],
            'vue/component-tags-order': [
                'error',
                {
                    order: [['script', 'template'], 'style'],
                },
            ],
            '@stylistic/js/padding-line-between-statements': [
                'error',
                //перед return
                { blankLine: 'always', prev: '*', next: 'return' },
                //после объявления переменных
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                //между объявлениями переменных
                {
                    blankLine: 'any',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
                //после {}
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*',
                },
                //после директив
                { blankLine: 'always', prev: 'directive', next: '*' },
                //между директивами
                { blankLine: 'any', prev: 'directive', next: 'directive' },
                //после case, default
                { blankLine: 'always', prev: ['case', 'default'], next: '*' },
                //после импортов
                { blankLine: 'always', prev: 'import', next: '*' },
                //между импортами
                { blankLine: 'any', prev: 'import', next: 'import' },
                //после expression
                { blankLine: 'always', prev: 'expression', next: '*' },
                //между expression
                { blankLine: 'any', prev: 'expression', next: 'expression' },
            ],
            '@stylistic/js/arrow-parens': ['error', 'always'],
            'vue/max-attributes-per-line': [
                'warn',
                {
                    singleline: {
                        max: 20,
                    },
                    multiline: {
                        max: 1,
                    },
                },
            ],
        },
    },
];
