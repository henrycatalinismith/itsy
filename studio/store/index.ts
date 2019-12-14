import { Dimensions } from "react-native"
import { configureStore, getDefaultMiddleware, createSelector } from "@reduxjs/toolkit"

import {
  palette,
  snapshot,
  spritesheet,
} from "../defaults"

import disks from "./disks"
import editor from "./editor"
import screen from "./screen"

const middleware = [...getDefaultMiddleware()]

const reducer = {
  disks: disks.reducer,
  editor: editor.reducer,
  screen: screen.reducer,
}

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

export default store
