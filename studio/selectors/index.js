import { selector } from "@highvalley.systems/signalbox"

import assets from "./assets"
import code from "./code"
import disks from "./disks"
import drive from "./drive"
import itsy from "./itsy"
import layout from "./layout"

export default {
  assets: selector("assets", assets),
  code: selector("code", code),
  disks: selector("disks", disks),
  drive: selector("drive", drive),
  itsy: selector("itsy", itsy),
  layout: selector("layout", layout),
}
