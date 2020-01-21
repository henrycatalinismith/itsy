import {
  Action,
  combineReducers,
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"

import express from "express"
import fs from "fs"
import { palette, snapshot, spritesheet } from "../studio/defaults"
import { Disk } from "@itsy.studio/types"
import read from "./exports/read"
import write from "./exports/write"

const d: Disk = {
  id: "example",
  name: "example",
  lua: fs.readFileSync("./itsy.lua", "utf-8"),
  palette,
  snapshot,
  spritesheet,
  active: true,
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
}

const disk = createSlice({
  name: "disk",
  initialState: d,
  reducers: {},
})

const server = createSlice({
  name: "server",
  initialState: {},
  reducers: {},
})

const middleware = [...getDefaultMiddleware()]

const reducer = combineReducers({
  disk: disk.reducer,
  server: server.reducer,
})

const preloadedState = {}

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
})

const app = express()

const port = process.env.PORT || "8080"

app.use((req, res, next) => {
  res.send(write(store.getState().disk))
  // store.dispatch(actions.request(req, res, next))
  res.on("finish", () => {
    // store.dispatch(actions.response(req, res))
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  console.log(`http://localhost:${port}`)
})
