const path = require("path")

const plugin = (name, options = {}) => ({
  resolve: name,
  options: options,
})

const plugins = [
  plugin("gatsby-plugin-alias-imports", {
    alias: {
      "@highvalley.systems/palettes": path.resolve(__dirname, "../palettes"),
      "@highvalley.systems/pixlflip": path.resolve(__dirname, "../pixlflip"),
      "@highvalley.systems/itsysite": __dirname,
      react: path.resolve(__dirname, "node_modules/react"),
    },
  }),

  plugin("gatsby-plugin-page-creator", {
    path: `${__dirname}/pages`,
  }),

  plugin("gatsby-plugin-react-helmet"),

  plugin("gatsby-plugin-sass", {
    implementation: require("sass"),
  }),

  plugin("gatsby-plugin-typescript"),
]

module.exports = {
  plugins,
}
