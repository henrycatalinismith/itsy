import { reducer } from "@highvalley.systems/signalbox"

export default reducer({}, {
  resizeWindow: (layout, { windowWidth, windowHeight }) => ({
    ...layout,
    windowWidth,
    windowHeight,
  }),
})

