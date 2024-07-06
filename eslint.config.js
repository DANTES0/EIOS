import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';


export default [
	{ files: ['src/**/*.{js,mjs,cjs,vue}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended, 
	...pluginVue.configs['flat/essential'],
	{
		rules: {
			'indent': [
				'warn',
				'tab'
			],
			'linebreak-style': [
				'error',
				'windows'
			],
			'quotes': [
				'error',
				'single'
			],
			'semi': [
				'error',
				'always'
			],
			'no-unused-vars': [
				'warn'
			],
			'no-empty': [
				'warn'
			]
		}
	},
];