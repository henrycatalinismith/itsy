export default {
  withDimensions: (assets, width, height) => assets
    .filter(asset => asset.width === width)
    .filter(asset => asset.height === height),
}

