import { combineReducers } from "redux"

import assets from "./assets"
import disks from "./disks"
import drive from "./drive"
import home from "./home"
import itsy from "./itsy"
import scalars from "./scalars"

export default combineReducers({
  assets,
  disks,
  drive,
  home,
  itsy,
  scalars,
})
