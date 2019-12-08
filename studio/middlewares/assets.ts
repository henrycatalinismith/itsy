import { Asset } from "expo-asset"
import { before, after } from "@highvalley.systems/signalbox"

import actions from "../actions"
import select from "../selectors"

export default [
  after("start", store => store.dispatch(actions.load(require(
    "../assets/webviews/editor.html"
  )))),

  after("start", store => store.dispatch(actions.load(require(
    "../assets/images/robot-dev.png"
  )))),

  after("start", store => store.dispatch(actions.load(require(
    "../assets/images/robot-prod.png"
  )))),

  after("start", store => store.dispatch(actions.load(require(
    "../assets/webviews/manual.html"
  )))),

  before("load", (store, action) => {
    action.asset = Asset.fromModule(action.asset)
  }),
]

