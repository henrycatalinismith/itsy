import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import { ThunkAction } from "redux-thunk"

import disks from "./disks"
import output from "./output"
import player from "./player"
import starters from "./starters"
import storage from "./storage"
import webviews from "./webviews"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  disks: disks.reducer,
  output: output.reducer,
  player: player.reducer,
  starters: starters.reducer,
  storage: storage.reducer,
  webviews: webviews.reducer,
})

const preloadedState = {}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
})

exports.disks = disks
exports.output = output
exports.player = player
exports.starters = starters
exports.storage = storage
exports.webviews = webviews

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
