
module.exports = {
    lintOnSave: false,  // 是否开启eslint
    publicPath: './',    // 打包文件相对路径地址. './'时可以静态文件打开，'/'时需要启动web服务器
    devServer: {
        open: true, // 是否自动弹出浏览器
        host: '0.0.0.0',
        port: 8090, // 端口
        https: false,
        hotOnly: true, // 热更新
        proxy: {
            '/apis': {
                target: 'http://127.0.0.1:9999', // 目标地址
                // ws: true, // 是否启用websockets
                secure: false, // 使用的是http协议则设置为false，https协议则设置为true
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {'^/apis': ''}    // 这里重写路径
            }
        }
    },
    // 文件名加上hash 避免cdn缓存。
    chainWebpack: config => {
        config.output.filename('[name].[hash:6].js').end();
        config.output.chunkFilename('[name].[hash:6].js').end();
    }
}