import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import * as Device from "expo-device"
import { Dimensions } from "react-native"
import { ThunkAction } from "redux-thunk"

import device from "./device"
import disks from "./disks"
import editor from "./editor"
import keyboard from "./keyboard"
import panels, { PanelId } from "./panels"
import player from "./player"
import safeArea from "./safe-area"
import screen from "./screen"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  device: device.reducer,
  disks: disks.reducer,
  editor: editor.reducer,
  keyboard: keyboard.reducer,
  panels: panels.reducer,
  player: player.reducer,
  safeArea: safeArea.reducer,
  screen: screen.reducer,
})

const preloadedState = {
  device: {
    brand: Device.brand,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  },

  panels: {
    disks: {
      id: PanelId.disks,
      active: true,
      rank: 0,
    },

    code: {
      id: PanelId.code,
      active: !!Device.modelName.match(/iPad/),
      rank: 1,
    },

    play: {
      id: PanelId.play,
      active: !!Device.modelName.match(/iPad/),
      rank: 2,
    },

    help: {
      id: PanelId.help,
      active: false,
      rank: 3,
    },
  },

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
}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
})

exports.device = device
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
