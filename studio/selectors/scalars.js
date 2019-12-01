export default {
  diskId: scalars => scalars.diskId,
  ready: scalars => scalars.ready,
  running: scalars => scalars.running,
  width: scalars => scalars.width,
  height: scalars => scalars.height,

  orientation: scalars => scalars.width >= scalars.height
    ? "landscape"
    : "portrait",
}

