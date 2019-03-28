import { combineReducers } from "redux"

import app from "./app"
import assets from "./assets"
import code from "./code"
import disks from "./disks"
import drive from "./drive"
import home from "./home"
import layout from "./layout"

export default combineReducers({
  app,
  code,
  assets,
  disks,
  drive,
  home,
  layout,
})
