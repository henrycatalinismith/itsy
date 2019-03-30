export default {
  diskId: scalars => scalars.diskId,
  ready: scalars => scalars.ready,
  running: scalars => scalars.running,
  windowWidth: scalars => scalars.windowWidth,
  windowHeight: scalars => scalars.windowHeight,

  orientation: scalars => scalars.windowWidth >= scalars.windowHeight
    ? "landscape"
    : "portrait",
}

