const path = require("path")

const CssLoader = {
  loader: "css-loader",
  options: {
    modules: true,
  }
}

const CssModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
  }
}

const SassLoader = {
  loader: "sass-loader",
  options: {
    implementation: require("sass")
  }
}

module.exports = async ({ config }) => {
  config.module.rules[0].use[0].options.sourceType = "unambiguous";

  config.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      "style-loader",
      CssModuleLoader,
      SassLoader,
    ]
  })

  config.module.rules.push({
    test: /(?<!\.module)\.scss$/,
    use: [
      "style-loader",
      CssLoader,
      SassLoader,
    ]
  })

  return config
} 
