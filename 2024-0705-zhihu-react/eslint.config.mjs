import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import prettier from "eslint-config-prettier";
// import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      "semi": ["error", "always"],
      "no-var": "error",
    },
    // 添加插件到 plugins 键
    // 注意：这里不再定义 "@typescript-eslint" 插件
    plugins: {
      // "@typescript-eslint": {}, // 这行被移除
      "prettier": {}
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // 确保这里不会重复定义 "@typescript-eslint"
];