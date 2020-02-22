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
            "@highvalley.systems/itsydraw": path.resolve(__dirname, "../itsydraw"),
            "@highvalley.systems/itsyexpo": path.resolve(__dirname),
            "@highvalley.systems/itsyplay": path.resolve(__dirname, "../itsyplay"),
            "@highvalley.systems/palettes": path.resolve(
              __dirname,
              "../palettes"
            ),
            "@highvalley.systems/pixlflip": path.resolve(
              __dirname,
              "../pixlflip"
            ),
          },
        },
      ],
    ],
  }
}
