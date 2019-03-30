import { combineReducers } from "redux"

import assets from "./assets"
import disks from "./disks"
import drive from "./drive"
import edits from "./edits"
import scalars from "./scalars"

export default combineReducers({
  assets,
  disks,
  drive,
  edits,
  scalars,
})
