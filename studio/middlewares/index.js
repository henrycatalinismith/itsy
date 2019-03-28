import { applyMiddleware } from "redux"

import assets from "./assets"
import database from "./database"
import drive from "./drive"
import layout from "./layout"
import log from "./log"

export default applyMiddleware.apply(null, [
  ...assets,
  ...database,
  ...drive,
  ...layout,
  ...log,
])
