const path = require("path")
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig()

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer"),
    },

    resolver: {
      extraNodeModules: {
        "@babel/runtime": path.resolve(
          __dirname,
          "node_modules/@babel/runtime"
        ),
        react: path.resolve(__dirname, "node_modules/react"),
      },
      sourceExts: [...sourceExts, "scss"],
    },

    watchFolders: [
      path.resolve(__dirname, "../itsyedit"),
      path.resolve(__dirname, "../itsyplay"),
      path.resolve(__dirname, "../palettes"),
      path.resolve(__dirname, "../pixelflip"),
    ],
  }
})()
