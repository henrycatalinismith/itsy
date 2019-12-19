const path = require("path")

module.exports = (api) => {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@itsy.studio/editor": path.resolve(__dirname, "../editor"),
            "@itsy.studio/itsy": path.resolve(__dirname, "../itsy"),
            "@itsy.studio/studio": path.resolve(__dirname),
            "@itsy.studio/palettes": path.resolve(__dirname, "../palettes"),
            "@itsy.studio/pixelflip": path.resolve(__dirname, "../pixelflip"),
          },
        },
      ],
    ],
  }
}
