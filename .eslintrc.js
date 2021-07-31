module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
    // 'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    "react/prop-types": 0,   // 对 props 的类型无需检查
    "@typescript-eslint/no-unused-vars": [2],     // ts 函数声明未使用变量
    "react/display-name": 0
  },
};
