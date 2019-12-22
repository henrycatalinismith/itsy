import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import { Dimensions } from "react-native"
import { ThunkAction } from "redux-thunk"

import { palette, snapshot, spritesheet } from "../defaults"

import disks from "./disks"
import editor from "./editor"
import keyboard from "./keyboard"
import player from "./player"
import screen from "./screen"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  disks: disks.reducer,
  editor: editor.reducer,
  keyboard: keyboard.reducer,
  player: player.reducer,
  screen: screen.reducer,
})

const preloadedState = {
  screen: {
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

exports.disks = disks
exports.editor = editor
exports.keyboard = keyboard
exports.player = player
exports.screen = screen

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
