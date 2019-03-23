import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("resizeWindow", ["windowWidth", "windowHeight"]),
}
