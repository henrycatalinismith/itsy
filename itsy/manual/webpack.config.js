const HtmlWebpackPlugin = require("html-webpack-plugin")
const InlineSourcePlugin = require("html-webpack-inline-source-plugin")

module.exports = {
  mode: "production",
  entry: `${__dirname}/index.js`,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
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
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          },
        ]
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
