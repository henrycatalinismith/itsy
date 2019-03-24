import { combineReducers } from "redux"

import app from "./app"
import assets from "./assets"
import disks from "./disks"
import layout from "./layout"

export default combineReducers({
  app,
  assets,
  disks,
  layout,
})
