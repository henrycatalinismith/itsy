import { combineReducers } from "redux"

import assets from "./assets"
import code from "./code"
import disks from "./disks"
import drive from "./drive"
import home from "./home"
import itsy from "./itsy"
import scalars from "./scalars"

export default combineReducers({
  code,
  assets,
  disks,
  drive,
  home,
  itsy,
  scalars,
})
