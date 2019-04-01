import { applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"

import assets from "./assets"
import database from "./database"
import log from "./log"
import scalars from "./scalars"

export default applyMiddleware.apply(null, [
  reduxThunk,
  ...assets,
  ...database,
  ...log,
  ...scalars,
])
