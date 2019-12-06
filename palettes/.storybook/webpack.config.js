const path = require("path")

module.exports = ({ config, mode }) => {

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader")

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]

  config.module.rules.push({
    test: /\.module\.scss$/,
    loaders: [
      "style-loader",
      {
        loader: require.resolve("css-loader"),
        options: {
          sourceMap: true,
          importLoaders: 2,
          modules: {
            localIdentName: "[folder]-[local]",
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"),
        }
      },
    ],
    include: path.resolve(__dirname, "../")
  })

  config.module.rules.push({
    test: /(?<!\.module)\.scss$/,
    loaders: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass"),
        }
      },
    ],
    include: path.resolve(__dirname, "../")
  })

  return config
}