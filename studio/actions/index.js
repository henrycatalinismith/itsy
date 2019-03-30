import { action } from "@highvalley.systems/signalbox"

export default {
  ...action("load"),
  ...action("start"),
  ...action("loadAsset", ["asset"]),
  ...action("selectDisk", ["diskId"]),
  ...action("resizeWindow", ["windowWidth", "windowHeight"]),
  ...action("updateDisk", ["disk"]),
  ...action("play", ["disk"]),
  ...action("stop", []),
}
