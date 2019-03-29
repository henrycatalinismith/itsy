import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("load"),
  ...action("start"),
  ...action("loadAsset", ["asset"]),
  ...action("selectDisk", ["disk"]),
  ...action("resizeWindow", ["windowWidth", "windowHeight"]),
  ...action("changeCode", ["code"]),
  ...action("updateDisk", ["disk"]),
  ...action("play", ["disk"]),
  ...action("stop", []),
}
