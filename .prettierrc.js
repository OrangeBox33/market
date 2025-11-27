module.exports = {
	semi: true,
	trailingComma: 'es5',
	singleQuote: true,
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	bracketSpacing: true,
	arrowParens: 'avoid',
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	importOrder: ['^react', '^@?\\w', '^[./]'],
	importOrderSortSpecifiers: true,
};
