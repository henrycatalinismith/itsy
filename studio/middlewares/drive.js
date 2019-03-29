import { before, after } from "@highvalley.systems/signalbox"
import uuid from "uuid"

import actions from "../actions"
import select from "../selectors"

export default [
  before("play", (store, action) => {
    //console.log("PLAY")
    //console.log(store.getState().drive.lua)
  }),

  before("play", (store, action) => {
    //console.log("PLAYED")
    //console.log(store.getState().drive.lua)
  }),
]

