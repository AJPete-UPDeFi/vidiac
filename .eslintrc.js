module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'next/core-web-vitals',
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'spaces',
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'@typescript-eslint/no-unused-vars': 'warn',
		'prettier/prettier': 'error', // Enables the prettier rules
	},
	'react': {
		'version': 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
	},
};
