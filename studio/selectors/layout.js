export default {
  orientation: layout => layout.windowWidth >= layout.windowHeight
    ? "landscape"
    : "portrait",
  windowWidth: layout => layout.windowWidth,
  windowHeight: layout => layout.windowHeight,
}

