import { reducer, assign, merge } from "@highvalley.systems/signalbox"

export default reducer({}, {
  start: assign({ ready: true }),
  open: merge("diskId"),
  play: assign({ running: true }),
  stop: assign({ running: false }),
  resize: merge("width", "height"),
})

