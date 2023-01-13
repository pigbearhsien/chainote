const webpack = require("webpack");

module.exports = function override(config, env) {
  config = {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      // extensions: [".ts", "js"],
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
        zlib: require.resolve("browserify-zlib"),
        console: require.resolve("console-browserify"),
      },
    },
  };
  return config;
};
