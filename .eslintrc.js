module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:json/recommended', 'prettier'],
   plugins: ['@babel'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
   
}
