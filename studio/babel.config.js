const path = require("path")

module.exports = api => {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [[
      "module-resolver", {
        alias: {
          "@itsy.studio/studio": path.resolve(__dirname),
        }
      },
    ]],
  }
}
