import { combineReducers } from "redux"

import app from "./app"
import assets from "./assets"
import code from "./code"
import disks from "./disks"
import home from "./home"
import layout from "./layout"

export default combineReducers({
  app,
  code,
  assets,
  disks,
  home,
  layout,
})
