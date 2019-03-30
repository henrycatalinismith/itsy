import { reducer, set, update } from "@highvalley.systems/signalbox"

export default reducer({}, {
  start: set({ ready: true }),
  open: update("diskId"),
  play: set({ running: true }),
  stop: set({ running: false }),
  resize: update("width", "height"),
})

