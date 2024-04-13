module.exports = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    rules: {
        // ...
        'at-rule-no-unknown': null,
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
      },
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindConfig: "./tailwind.config.js",
  };