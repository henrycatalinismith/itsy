import { applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"

import log from "./log"
import scalars from "./scalars"

export default applyMiddleware.apply(null, [
  reduxThunk,
  ...log,
  //...scalars,
])
