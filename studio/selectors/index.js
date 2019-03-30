import { selector } from "@highvalley.systems/signalbox"

import assets from "./assets"
import disks from "./disks"
import drive from "./drive"
import scalars from "./scalars"

export default {
  assets: selector("assets", assets),
  disks: selector("disks", disks),
  drive: selector("drive", drive),
  scalars: selector("scalars", scalars),
}
