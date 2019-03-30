import { applyMiddleware } from "redux"

import assets from "./assets"
import database from "./database"
import drive from "./drive"
import log from "./log"
import scalars from "./scalars"

export default applyMiddleware.apply(null, [
  ...assets,
  ...database,
  ...drive,
  ...log,
  ...scalars,
])
