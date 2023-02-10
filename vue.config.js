module.exports = {
    chainWebpack: (config) => {
        config.plugin("copy").tap(([options]) => {
            options[0].ignore.push("uploads/**");
            return [options];
        });
    },
    devServer: {
        https: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "https://127.0.0.1:3000/",
            },
        }
    }
}