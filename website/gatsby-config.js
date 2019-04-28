const plugin = (name, options = {}) => ({
  resolve: name,
  options: options,
})

const plugins = [
  plugin("gatsby-plugin-page-creator", {
    path: `${__dirname}/pages`,
  }),

  plugin("gatsby-plugin-react-helmet"),

  plugin("gatsby-plugin-sass", {
    implementation: require("sass"),
  }),

]

module.exports = {
  plugins,
}