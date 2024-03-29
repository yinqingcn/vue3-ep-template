module.exports = {
    //  设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
    env: {
      browser: true,
      es2021: true,
      node: true,
      // ++ 开启setup语法糖环境
      'vue/setup-compiler-macros': true
    },
    // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
    extends: [
      'plugin:vue/vue3-essential',
      // -- "standard-with-typescript",
      'plugin:@typescript-eslint/recommended'
    ],
    overrides: [
    ],
    //  ++ 新增，解析vue文件 ，使得eslint能解析<template>标签中的内容
    parser: 'vue-eslint-parser',
    parserOptions: {
      //  ++ 用来解析vue文件中<script>标签中的代码
      parser: '@typescript-eslint/parser',
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    // 添加vue和@typescript-eslint插件，增强eslint的能力
    plugins: [
      'vue',
      //  ++ 
      '@typescript-eslint',
      'prettier'
    ],
    //  ++ 
    rules: {
      // 解决  Don't use `{}` as a type. `{}` actually means "any non-nullish value" 
      '@typescript-eslint/ban-types': [
        'error',
        {
          'extendDefaults': true,
          'types': {
            '{}': false
          }
        }
      ],
      '@typescript-eslint/no-explicit-any': ["off"], // 关闭any校验
      'vue/multi-word-component-names': "off", // 关闭名称校验
      'prettier/prettier': 'off',
      '@typescript-eslint/no-var-requires': 0
    }
  }