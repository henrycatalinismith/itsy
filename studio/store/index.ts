import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  createSelector,
} from "@reduxjs/toolkit"

import { Dimensions } from "react-native"
import { ThunkAction } from "redux-thunk"

import {
  palette,
  snapshot,
  spritesheet,
} from "../defaults"

import disks from "./disks"
import editor from "./editor"
import player from "./player"
import screen from "./screen"
import worker from "./worker"

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  disks: disks.reducer,
  editor: editor.reducer,
  player: player.reducer,
  screen: screen.reducer,
  worker: worker.reducer,
})

const preloadedState = {
  disks: {
    uvw: {
      id: "uvw",
      name: "example",
      diskId: "abc",
      lua: "cls(12)\nrect(32, 32, 96, 96, 8)\nfunction _draw()\n  circ(64, 64, 64, rnd(15))\nend\n",
      palette,
      snapshot,
      spritesheet,
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
      started: undefined,
      stopped: undefined,
    },
  },
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
exports.player = player
exports.screen = screen
exports.worker = worker

export type RootState = ReturnType<typeof reducer>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<void, RootState, null, Action<string>>

export default store
