const path = require('path')
module.exports = {
  //基本路径
  publicPath:process.env.MODE_ENV === 'production' ? '' : '/',

  //输出文件目录
  outputDir:process.env.MODE_ENV === 'production' ? 'dist' : 'devdist',
  
  //eslint-loader 是否在保存的时候检查
  lintOnSave:false,

  //webpack 配置
  chainWebpack:(config) => {

  },
  configureWebpack:(config) => {
    //配置解析别名
    // config.resolve = {
    //   extensions:['.js','.json','.vue'],
    //   alias:{
    //     '@':path.resolve(__dirname,'./src'),
    //     'public':path.resolve(__dirname,'public'),
    //     'components':path.resolve(__dirname,'./src/components'),
    //     'common':path.resolve(__dirname,'./src/common'),
    //     'api':path.resolve(__dirname,'./src/api'),
    //     'views':path.resolve(__dirname,'./src/views'),
    //     'data':path.resolve(__dirname,'./src/data')
    //   }
    // }
  },

  //生产环境是否生成 sourceMap 文件
  productionSourceMap:false,

  //css 相关配置
  css:{
    //是否使用 css 分离插件 ExtractTextplugin(该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。)
    extract:true,
    //开启 css source maps ?
    sourceMap:false,
    //css 预设器配置项
    loaderOptions:{
      sass:{
        prependData:'@import "./src/styles/main.scss";'
      }
    },

    //去掉文件名中的 .module
    // requireModuleExtension:false,
    //启用 css modules for all css / pre-processor files
    modules:false

  }
}