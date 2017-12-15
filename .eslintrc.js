module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'], // "eslint:recommended",
  rules: {
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'no-unused-vars': 'warn',
    'no-console': 1,
    'no-unexpected-multiline': 'warn'
    // indent: ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always']
  },
  settings: {
    react: {
      pragma: 'React',
      version: '15.5.4'
    }
  }
};
