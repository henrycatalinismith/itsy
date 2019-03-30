import { reducer, assign, update } from "@highvalley.systems/signalbox"

export default reducer({}, {
  start: assign({ ready: true }),
  open: update("diskId"),
  play: assign({ running: true }),
  stop: assign({ running: false }),
  resize: update("width", "height"),
})

