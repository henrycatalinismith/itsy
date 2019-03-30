import { reducer, update } from "@highvalley.systems/signalbox"

export default reducer({}, {
  start: update("ready"),
  resizeWindow: update("windowWidth", "windowHeight"),
  selectDisk: update("diskId"),
})

