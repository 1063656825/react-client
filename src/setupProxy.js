const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app){
    
    app.use(
        createProxyMiddleware({
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          pathFilter: '/res',
        }),
        createProxyMiddleware({
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            pathFilter: '/api',
        }),
        createProxyMiddleware({
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            pathFilter: '/static',
        })
    );
}
