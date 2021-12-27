module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 13,
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'no-unused-vars': 0
	}
}
