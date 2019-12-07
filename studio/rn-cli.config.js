const path = require("path")
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig()

  return {
    getProjectRoots: () => [
      path.resolve(__dirname),
      path.resolve(__dirname, "../editor"),
    ],

    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer"),
    },

    resolver: {
      sourceExts: [...sourceExts, "scss"],
    },
  }
})()

