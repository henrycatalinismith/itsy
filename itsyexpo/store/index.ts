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
import disk from "./disk"
import keyboard from "./keyboard"
import panels, {
  PanelIds,
  PanelsState,
  DiskPanelModes,
  PanelAvailabilities,
  PanelVisibilities,
} from "./panels"
import output from "./output"
import player from "./player"
import safeArea from "./safe-area"
import screen from "./screen"
import starters from "./starters"
import storage from "./storage"
import webviews from "./webviews"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  device: device.reducer,
  disks: disks.reducer,
  disk: disk.reducer,
  keyboard: keyboard.reducer,
  output: output.reducer,
  panels: panels.reducer,
  player: player.reducer,
  safeArea: safeArea.reducer,
  screen: screen.reducer,
  starters: starters.reducer,
  storage: storage.reducer,
  webviews: webviews.reducer,
})

const initialPanelAvailabilities: { [key in PanelIds]: PanelAvailabilities } = {
  [PanelIds.disk]: PanelAvailabilities.Available,
  [PanelIds.code]: PanelAvailabilities.Unavailable,
  [PanelIds.play]: PanelAvailabilities.Unavailable,
  [PanelIds.draw]: PanelAvailabilities.Unavailable,
  [PanelIds.help]: PanelAvailabilities.Available,
}

const initialPanelVisibilities: { [key in PanelIds]: PanelVisibilities } = {
  [PanelIds.disk]: PanelVisibilities.Visible,
  [PanelIds.code]: PanelVisibilities.Hidden,
  [PanelIds.play]: PanelVisibilities.Hidden,
  [PanelIds.draw]: PanelVisibilities.Hidden,
  [PanelIds.help]: !!Device.modelName.match(/iPad/)
    ? PanelVisibilities.Visible
    : PanelVisibilities.Hidden,
}

const panelsState: PanelsState = {
  disk: {
    id: PanelIds.disk,
    mode: DiskPanelModes.Browse,
    availability: initialPanelAvailabilities[PanelIds.disk],
    visibility: initialPanelVisibilities[PanelIds.disk],
    rank: 0,
  },

  code: {
    id: PanelIds.code,
    availability: initialPanelAvailabilities[PanelIds.code],
    visibility: initialPanelVisibilities[PanelIds.code],
    rank: 1,
  },

  play: {
    id: PanelIds.play,
    availability: initialPanelAvailabilities[PanelIds.play],
    visibility: initialPanelVisibilities[PanelIds.play],
    rank: 2,
  },

  draw: {
    id: PanelIds.draw,
    availability: initialPanelAvailabilities[PanelIds.draw],
    visibility: initialPanelVisibilities[PanelIds.draw],
    rank: 3,
  },

  help: {
    id: PanelIds.help,
    availability: initialPanelAvailabilities[PanelIds.help],
    visibility: initialPanelVisibilities[PanelIds.help],
    rank: 4,
    path: "/",
  },
}

const preloadedState = {
  device: {
    brand: Device.brand,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  },

  panels: panelsState,

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

exports.device = device
exports.disks = disks
exports.disk = disk
exports.keyboard = keyboard
exports.output = output
exports.panels = panels
exports.player = player
exports.safeArea = safeArea
exports.screen = screen
exports.starters = starters
exports.storage = storage
exports.webviews = webviews

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
