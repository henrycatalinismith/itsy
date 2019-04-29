const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineSourcePlugin = require("html-webpack-inline-source-plugin")

module.exports = {
  mode: "production",
  entry: `${__dirname}/index.js`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
            ],
          }
        }
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "build.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: ".(js|css)$",
    }),
    new InlineSourcePlugin(),
  ]
}
