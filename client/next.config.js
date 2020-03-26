// use less and css together with the help of plugins
const withLess = require('@zeit/next-less')

const withCSS = require('@zeit/next-css');

const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = withCSS(withLess({
}));