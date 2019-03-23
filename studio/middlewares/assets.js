import { Asset } from "expo"
import { before, after } from "@highvalley.systems/signalbox"
import actions from "../actions"

export default [
  after("start", store => store.dispatch(actions.loadAsset(require(
    "../assets/images/robot-dev.png"
  )))),

  after("start", store => store.dispatch(actions.loadAsset(require(
    "../assets/images/robot-prod.png"
  )))),

  before("loadAsset", (store, action) => {
    action.asset = Asset.fromModule(action.asset)
  }),

  after("loadAsset", (store, action) => {
    console.log(store.getState())
  }),
]

