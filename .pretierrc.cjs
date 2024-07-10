const config = {
    trailingComma: 'none',
    tabWidth: 4,
    printWidth: 80,
    useTabs: false,
    semi: false,
    singleQuote: true,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    arrowParens: 'always',
    jsxBracketSameLine: false,
    endOfLine: 'lf',
    tailwindConfig: './tailwind.config.js',
    overrides: [
      {
        files: '.prettierrc',
        options: {
          parser: 'json',
        },
      },
    ],
    plugins: [import('prettier-plugin-tailwindcss')],
  };

  module.exports = config;