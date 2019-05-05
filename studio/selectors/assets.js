export default {
  forEditorWebview: assets => assets
    .filter(asset => asset.name === "editor")
    .filter(asset => asset.type === "html")
    .pop(),

  forHelpScreen: assets => assets
    .filter(asset => asset.name === "manual")
    .filter(asset => asset.type === "html")
    .pop(),

  withDimensions: (assets, width, height) => assets
    .filter(asset => asset.width === width)
    .filter(asset => asset.height === height),
}

