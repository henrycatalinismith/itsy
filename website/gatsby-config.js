const plugin = (name, options = {}) => ({
  resolve: name,
  options: options,
})

const plugins = [
  plugin("gatsby-plugin-alias-imports", {
    alias: {
      "@itsy.studio/website": __dirname,
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
