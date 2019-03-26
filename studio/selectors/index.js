import { selector } from "@highvalley.systems/signalbox"

import assets from "./assets"
import code from "./code"
import disks from "./disks"
import layout from "./layout"

export default {
  assets: selector("assets", assets),
  code: selector("code", code),
  disks: selector("disks", disks),
  layout: selector("layout", layout),
}
