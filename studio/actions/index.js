import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("load"),
  ...action("start"),
  ...action("loadAsset", ["asset"]),
  ...action("changeCode", ["code"]),
  ...action("selectDisk", ["disk"]),
  ...action("resizeWindow", ["windowWidth", "windowHeight"]),
}
