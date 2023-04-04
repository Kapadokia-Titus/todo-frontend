module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "@vue/typescript/recommended",
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  ignorePatterns: ["vite-env.d.ts"],
}
