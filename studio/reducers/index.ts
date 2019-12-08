import { combineReducers } from "redux"

import disks from "./disks"
import edits from "./edits"
import scalars from "./scalars"

export default combineReducers({
  disks,
  edits,
  scalars,
})
