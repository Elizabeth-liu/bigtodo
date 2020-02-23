// 未引入next-less，内置global css和module css可以正常使用
// 新版本中，使用next-less等plugin时，built-in-css support就自动失效了。。。
const withLess = require('@zeit/next-less')

const withCSS = require('@zeit/next-css');

module.exports = withCSS(withLess({
  // 设置为true，没法用global；设置为false, 没法用module.......
  // cssModules: true
}));