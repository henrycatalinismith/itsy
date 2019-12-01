import { selector } from "@highvalley.systems/signalbox"

import assets from "./assets"
import disks from "./disks"
import edits from "./edits"
import scalars from "./scalars"

export default {
  assets: selector("assets", assets),
  disks: selector("disks", disks),
  edits: selector("edits", edits),
  scalars: selector("scalars", scalars),
}
