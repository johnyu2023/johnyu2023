# 1. 背景
参考教程中 react 实战来构建的例子 3
重新再次搭建项目

# 3. 步骤
## 3.1 创建项目 monorepo

### 3.1.1 总项目 初始化
pnpm init - 总项目的初始化
总项目名加上 scope，如 @john/zhihu-demo

### 3.1.2 创建子目录
packages/apps - 多个应用
packages/components - 跨项目的组件
packages/libs - 跨项目的库

### 3.1.3 创建 pnpm-workspace.yaml
该文件是用于配置和管理使用 pnpm 包管理器的多包仓库的工作空间
``` javascript
// pnpm-workspace.yaml
packages: 
  - "packages/**"
```

### 3.1.4 创建子项目： 工具
创建 libs/text-util
pnpm init - 创建子项目的初始化，注意加 scope，如 @john/text-util
index.js 里创建一个函数，用于测试
package.json 里添加: "type": "module",

### 3.1.5 创建子项目： 应用
创建 apps/text-pro
pnpm init - 创建子项目的初始化，注意加 scope，如 @john/text-pro
index.js 里创建一个函数，用于测试
package.json 里添加: "type": "module",


# 2. 总结
实际上 useState useEffect 基本能解决99%的问题，就是可能性能会差一些

亮点是什么？
具备⼀定的思考、技术难度、解决了关键问题。
• 基于业务，封装公共能⼒，解决业务中的标准问题，并推⼴派⽣；
• 使⽤⼯程化⼿段，解决⼀类流程或研发逻辑、标准的问题；
• 你搞了⼀个东西，这个东西之前⾏业没有，并解决了问题。

webpack 的优化不是亮点，因为 webpack 已经做得很好了，没什么可以优化的空间了，无非就是那些 分包、压缩、构建优化、打包优化--并行构建、分析包体积，哪些包排除出去，没啥了

monorepo
多个项⽬⽤⼀个代码库来管理依赖关系

# 3. 步骤
## 3.1 创建项目 monorepo

### 3.1.1 总项目 初始化
pnpm init - 总项目的初始化
总项目名加上 scope，如 @john/zhihu-demo

### 3.1.2 创建子目录
apps - 多个应用
components - 跨项目的组件
libs - 跨项目的库

### 3.1.3 创建 pnpm-workspace.yaml
该文件是用于配置和管理使用 pnpm 包管理器的多包仓库的工作空间

### 3.1.4 创建子项目： 工具
创建 libs/text-util
pnpm init - 创建子项目的初始化，注意加 scope，如 @john/zhihu-demo
index.js 里创建一个函数，用于测试
package.json 里添加: "type": "module"

### 3.1.5 创建子项目： 应用
创建 apps/text-pro>
pnpm init - 创建子项目的初始化，注意加 scope，如 @john/text-pro
index.js 里创建一个函数，用于测试
package.json 里添加: "type": "module"

### 3.1.5 建立子项目之间的引用关系： @john/text-pro 引用 @john/text-util
回到总的项目根目录，输入如下命令
pnpm add workspace:@john/text-util@1.0.0 -F @john/text-pro
项目 @john/text-pro 的 package.json 里出现 "@john/text-util": "workspace:^"
项目 @john/text-pro 的 node_modules 里出现 @john/text-util 的硬链接
在项目 @john/text-pro 中引用@john/text-util: import {getNameFromJohn} from '@john/text-util';
运行 @john/text-pro 可进行验证

## 3.2 安装相关需要依赖的开发工具库
### 3.2.1 eslint - 代码质量检查工具
eslint 主要用于监测 JavaScript 代码质量。
+ 它可以检查代码中的潜在问题，如未使用的变量、未定义的引用、不必要的括号等，从而帮助开发者提升编码能力。
+ 统一开发者的编程风格，确保团队成员遵循一致的代码规范。

项目根目录中执行：
pnpm add eslint -D -w
npx eslint --init

由于 -w 的问题，需要⼿动安装
pnpm add @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D -w

由于一些未知原因，eslint 配置文件不能正常运行，需要全局安装如下内容，否则 eslint.config.mjs 会报错
pnpm install globals -w
pnpm install typescript-eslint -w

### 3.2.2 Prettier - 代码格式化工具
当ESLint和Prettier同时使用时，为了避免冲突，通常需要配置ESLint以禁用与Prettier冲突的规则，或者使用eslint-config-prettier等配置来确保两者之间的和谐共存。

+ 项目根目录中执行：
pnpm add prettier -D -w

+ 新建⼀个 .prettierrc.json 的配置，写⼀下
{
    "printWidth": 80,
    "tabWidth": 2,
    "useTabs": true
}

+ 应先安装 VS Code 的插件： ESLint 和 Prettier

+ prettier 可能和 eslint 有冲突
pnpm add eslint-plugin-prettier eslint-config-prettier -D -w

### 3.2.3 安装 typescript
#### 3.2.3.1 创建 react 项目 react-master
mkdir apps/react-master
cd apps/react-master
pnpm init
修改 package.json 中项目名，加入 scope，名字为 @john/react-master

// 创建 tsconfig.json
tsc --init   

#### 3.2.3.2 到项目根目录去安装一些插件
pnpm add @typescript-eslint/eslint-plugin -D -w

#### 3.2.3.3 修改根目录下的 eslint.config.mjs
``` javascript
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
```

### 3.2.4 安装 react
#### 3.2.4.1 安装依赖项
项目根目录下执行：
pnpm add webpack webpack-cli webpack-merge webpack-dev-server babel-loader @babel/core @babel/preset-react @babel/preset-env @babel/preset-typescript style-loader css-loader less less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin css-minimizer-webpack-plugin terser-webpack-plugin mini-css-extract-plugin cross-env -D --filter @john/react-master

pnpm add react react-dom @types/react @types/react-dom --filter @john/react-master

#### 3.2.4.2 通过脚手架新建一个 react 项目 (用于参考)
从根目录开始
cd packages/apps
npx create-react-app demo

### 3.3 路由
pnpm add react-router-dom --filter @john/react-master

#### 3.3.2 React Router 文档
https://reactrouter.com/en/main  -- 英语，官方
http://www.reactrouter.cn/docs/ -- 中文



### 2. 创建子目录
components - 组件
pages
router
utils