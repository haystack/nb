module.exports = {
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