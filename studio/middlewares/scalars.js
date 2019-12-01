import { Dimensions } from "react-native"
import { before, after } from "@highvalley.systems/signalbox"

import actions from "../actions"
import select from "../selectors"

export default [
  after("start", store => {
    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window")
      store.dispatch(actions.resize(width, height))
    })
  }),

  after("snap", (store, action) => {
    console.log(action.edit.snapshot)
  }),
]


