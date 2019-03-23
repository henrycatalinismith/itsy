import { applyMiddleware } from "redux"

import assets from "./assets"
import log from "./log"

export default applyMiddleware.apply(null, [
  ...assets,
  ...log,
])
