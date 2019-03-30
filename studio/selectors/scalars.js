export default {
  ready: scalars => scalars.ready,
  windowWidth: scalars => scalars.windowWidth,
  windowHeight: scalars => scalars.windowHeight,

  orientation: scalars => scalars.windowWidth >= scalars.windowHeight
    ? "landscape"
    : "portrait",
}

