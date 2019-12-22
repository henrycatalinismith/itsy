const path = require("path")
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig()

  return {
    getProjectRoots: () => [
      path.resolve(__dirname),
      path.resolve(__dirname, "../editor"),
      path.resolve(__dirname, "../itsy"),
      path.resolve(__dirname, "../palettes"),
      path.resolve(__dirname, "../pixelflip"),
    ],

    getTransformModulePath: () => {
      return require.resolve("react-native-typescript-transformer")
    },

    getSourceExts() {
      return ["js", "jsx", "ts", "tsx"]
    },

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
      path.resolve(__dirname, "../editor"),
      path.resolve(__dirname, "../itsy"),
      path.resolve(__dirname, "../palettes"),
      path.resolve(__dirname, "../pixelflip"),
    ],
  }
})()
