import { selector } from "@highvalley.systems/signalbox"

import assets from "./assets"
import layout from "./layout"

export default {
  assets: selector("assets", assets),
  layout: selector("layout", layout),
}
