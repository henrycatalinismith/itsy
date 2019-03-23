import { applyMiddleware } from "redux"

import assets from "./assets"
import layout from "./layout"
import log from "./log"

export default applyMiddleware.apply(null, [
  ...assets,
  ...layout,
  ...log,
])
