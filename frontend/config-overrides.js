const webpack = require("webpack");

module.exports = function override(config, env) {
  config = {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      // extensions: [".ts", "js"],
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify"),
        console: require.resolve("console-browserify"),
      },
    },
  };
  return config;
};
