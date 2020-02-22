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
            "@highvalley.systems/itsycode": path.resolve(
              __dirname,
              "../editor"
            ),
            "@highvalley.systems/itsyplay": path.resolve(__dirname, "../itsy"),
            "@itsy.studio/studio": path.resolve(__dirname),
            "@highvalley.systems/palettes": path.resolve(
              __dirname,
              "../palettes"
            ),
            "@highvalley.systems/pixlflip": path.resolve(
              __dirname,
              "../pixelflip"
            ),
          },
        },
      ],
    ],
  }
}
