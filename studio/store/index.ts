import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import { Dimensions } from "react-native"
import { ThunkAction } from "redux-thunk"

import devtools from "./devtools"
import disks from "./disks"
import editor from "./editor"
import keyboard from "./keyboard"
import panels from "./panels"
import player from "./player"
import safeArea from "./safe-area"
import screen from "./screen"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  devtools: devtools.reducer,
  disks: disks.reducer,
  editor: editor.reducer,
  keyboard: keyboard.reducer,
  panels: panels.reducer,
  player: player.reducer,
  safeArea: safeArea.reducer,
  screen: screen.reducer,
})

const preloadedState = {
  screen: {
    x: 0,
    y: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
})

exports.devtools = devtools
exports.disks = disks
exports.editor = editor
exports.keyboard = keyboard
exports.panels = panels
exports.player = player
exports.safeArea = safeArea
exports.screen = screen

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
