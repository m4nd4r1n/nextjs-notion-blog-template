module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@/(.*)$)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
