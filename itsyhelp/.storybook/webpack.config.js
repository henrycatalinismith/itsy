const path = require("path")

const CssModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
  },
}

const SassLoader = {
  loader: "sass-loader",
  options: {
    implementation: require("sass"),
  },
}

module.exports = async ({ config }) => {
  config.module.rules[0].use[0].options.sourceType = "unambiguous"

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
      },
    ],
  })

  config.module.rules.push({
    test: /\.module\.scss$/,
    use: ["style-loader", CssModuleLoader, SassLoader],
  })

  config.resolve.alias = {
    "@highvalley.systems/itsyhelp": path.resolve(__dirname, "../"),
  }

  config.resolve.extensions.push(".ts", ".tsx")

  return config
}
