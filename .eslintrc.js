module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    // 'no-console': 1,
    curly: 2,
    eqeqeq: 2,
    'prefer-const': 2,
    'no-undef': 2,
    'no-shadow-restricted-names': 2,
    'no-unused-vars': 2,
    'no-redeclare': 2,
    quotes: ['error', 'single'],
  },
  overrides: [
    {
      files: ['src/**/*.js'],
    },
  ],
};
