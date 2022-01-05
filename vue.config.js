const path = require("path");

const resolveSrc = (_path) => {
  return path.join(__dirname, _path);
};

module.exports = {
  publicPath: "/jj-cse-renewal/",
  configureWebpack: {
    devServer: {
      host: "test.jj-cse.online",
      port: 443,
      https: true,
    },
    resolve: {
      alias: {
        assets: resolveSrc("src/assets"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["postcss-loader"],
        },
      ],
    },
  },
};
