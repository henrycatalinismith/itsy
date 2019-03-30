import { reducer, set, update } from "@highvalley.systems/signalbox"

export default reducer({}, {
  start: set({ ready: true }),
  play: set({ running: true }),
  stop: set({ running: false }),
  resizeWindow: update("windowWidth", "windowHeight"),
  selectDisk: update("diskId"),
})

