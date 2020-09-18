/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
	"env": {
		"browser": true
	},
	"extends": [
		// "prettier",
		// "prettier/@typescript-eslint"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "tsconfig.json",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"eslint-plugin-jsdoc"
		// "@typescript-eslint/tslint"
	],
	"rules": {
		"@typescript-eslint/dot-notation": "error",
		"@typescript-eslint/indent": [
			"error",
			"tab",
			{
				"CallExpression": {
					"arguments": "first"
				},
				"FunctionDeclaration": {
					"parameters": "first"
				},
				"FunctionExpression": {
					"parameters": "first"
				}
			}
		],
		"@typescript-eslint/member-delimiter-style": [
			"error",
			{
				"multiline": {
					"delimiter": "semi",
					"requireLast": true
				},
				"singleline": {
					"delimiter": "semi",
					"requireLast": false
				}
			}
		],
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-require-imports": "off",
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/no-use-before-define": "error",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/prefer-namespace-keyword": "error",
		"@typescript-eslint/quotes": [
			"error",
			"single"
		],
		"@typescript-eslint/semi": [
			"error",
			"always"
		],
		"@typescript-eslint/type-annotation-spacing": "error",
		"brace-style": [
			"error",
			"1tbs"
		],
		"comma-dangle": "error",
		"curly": "off",
		"default-case": "error",
		"eol-last": "error",
		"eqeqeq": [
			"error",
			"smart"
		],
		"guard-for-in": "error",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined",
			"undefined"
		],
		"id-match": "error",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-indentation": "error",
		"jsdoc/newline-after-description": "error",
		"max-len": [
			"error",
			{
				"code": 140
			}
		],
		"no-bitwise": "error",
		"no-caller": "error",
		"no-console": [
			"error",
			{
				"allow": [
					"log",
					"dirxml",
					"warn",
					"error",
					"dir",
					"timeLog",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupCollapsed",
					"groupEnd",
					"table",
					"Console",
					"markTimeline",
					"profile",
					"profileEnd",
					"timeline",
					"timelineEnd",
					"timeStamp",
					"context"
				]
			}
		],
		"no-debugger": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-fallthrough": "error",
		"no-new-wrappers": "error",
		"no-redeclare": "error",
		"no-shadow": [
			"error",
			{
				"hoist": "all"
			}
		],
		"no-trailing-spaces": [
			"error", {
				"skipBlankLines": true
			}
		],
		"no-underscore-dangle": "error",
		"no-unused-labels": "error",
		"no-var": "error",
		"radix": "error",
		"spaced-comment": [
			"error",
			"always",
			{
				"markers": [
					"/"
				]
			}
		]
	}
};
