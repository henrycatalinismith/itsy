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

  after("snap", store => {
    console.log(store.getState().edits)
  }),

  //after("resize", store => {
    //console.log(store.getState().scalars)
  //}),

  //after("edit", store => {
    //console.log(store.getState().edits)
  //}),

  //after("play", store => {
    //console.log(store.getState().edits)
  //}),
]


