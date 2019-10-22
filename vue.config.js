const webpack = require('webpack')
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '/simBlog/' : '/', 
    // baseUrl 已经被publicPath代替
    publicPath: process.env.NODE_ENV === 'production' ? '/simBlog/' : '/',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:8080/',//这里后台的地址
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            }
            
        }
    },
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
          })
        ]
    }
}
