import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import { Dimensions } from "react-native"
import { ThunkAction } from "redux-thunk"

import disks from "./disks"
import disk from "./disk"
import keyboard from "./keyboard"
import output from "./output"
import player from "./player"
import safeArea from "./safe-area"
import screen from "./screen"
import screens from "./screens"
import starters from "./starters"
import storage from "./storage"
import webviews from "./webviews"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  disks: disks.reducer,
  disk: disk.reducer,
  keyboard: keyboard.reducer,
  output: output.reducer,
  player: player.reducer,
  safeArea: safeArea.reducer,
  screen: screen.reducer,
  screens: screens.reducer,
  starters: starters.reducer,
  storage: storage.reducer,
  webviews: webviews.reducer,
})

const preloadedState = {
  safeArea: {
    x: 0,
    y: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  screen: {
    x: 0,
    y: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  starters: {},
}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
})

exports.disks = disks
exports.disk = disk
exports.keyboard = keyboard
exports.output = output
exports.player = player
exports.safeArea = safeArea
exports.screen = screen
exports.screens = screens
exports.starters = starters
exports.storage = storage
exports.webviews = webviews

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
