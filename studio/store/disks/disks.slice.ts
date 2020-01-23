import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"
import _ from "lodash"
import { AsyncStorage, Keyboard } from "react-native"
import uuid from "uuid"

import { read, write } from "@itsy.studio/itsy"
import { Thunk } from "@itsy.studio/studio/store"
import player from "@itsy.studio/studio/store/player"
import {
  palette,
  snapshot as defaultSnapshot,
  spritesheet,
} from "@itsy.studio/studio/defaults"
import words from "@itsy.studio/studio/words"

function makeUri(id = uuid()): string {
  return `itsystudio://disk/${id}`
}

export enum DiskType {
  empty = "empty",
  normal = "normal",
}

export interface Disk {
  id: string
  uri: string
  name: string
  lua: string
  palette: string
  snapshot: string
  spritesheet: string
  active: boolean
  type: DiskType
  created: string
  updated: string
}

interface DiskState {
  [id: string]: Disk
}

const name = "disks"

const initialState: DiskState = {
  empty: {
    id: "empty",
    uri: "itsystudio://disk/empty",
    name: "",
    lua: "",
    palette,
    snapshot: defaultSnapshot,
    spritesheet,
    type: DiskType.empty,
    active: true,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
}

const reducers = {
  load(disks, action: PayloadAction<Disk[]>) {
    action.payload.forEach((disk) => {
      console.log(disk)
      disks[disk.id] = disk
    })
  },

  create(disks, action: PayloadAction<Disk>) {
    disks[action.payload.id] = {
      id: action.payload.id,
      uri: action.payload.uri,
      name: action.payload.name,
      lua: action.payload.lua,
      palette: action.payload.palette,
      snapshot: action.payload.snapshot,
      spritesheet: action.payload.spritesheet,
      active: action.payload.active,
      type: action.payload.type,
      created: action.payload.created,
      updated: action.payload.updated,
    }
  },

  open(disks, action: PayloadAction<string>) {
    _.filter(disks, "active").forEach((disk) => {
      disk.active = false
    })
    disks[action.payload].active = true
  },

  rename(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.name = action.payload
    disk.updated = new Date().toISOString()
  },

  edit(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.lua = action.payload
    disk.updated = new Date().toISOString()
  },

  snapshot(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.snapshot = action.payload
    disk.updated = new Date().toISOString()
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const createDisk = (): Thunk => async (dispatch, getState) => {
  const id = uuid()
  const uri = makeUri(id)
  const name = words()
  const lua = ""
  const active = false
  const created = new Date().toISOString()
  const updated = created
  const disk: Disk = {
    id,
    uri,
    name,
    lua,
    palette,
    snapshot: defaultSnapshot,
    spritesheet,
    type: DiskType.normal,
    active,
    created,
    updated,
  }

  await AsyncStorage.setItem(disk.uri, JSON.stringify(disk))

  dispatch(slice.actions.create(disk))
}

export const editDisk = (lua: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.edit(lua))

  const state = getState()
  const disk = selectActiveDisk(state)

  if (disk.type === DiskType.empty) {
    return
  }

  await AsyncStorage.setItem(disk.uri, JSON.stringify(disk))
}

export const loadDisks = (): Thunk => async (dispatch) => {
  const keys = await AsyncStorage.getAllKeys()
  const diskUris = keys.filter((key) => key.match(/^itsystudio:\/\/disk/))

  const diskStrings = await AsyncStorage.multiGet(diskUris)
  const disks = diskStrings.map(
    ([uri, diskString]): Disk => {
      const disk: Disk = JSON.parse(diskString)
      disk.active = false
      return disk
    }
  )

  dispatch(slice.actions.load(disks))
}

export const openDisk = (id: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.open(id))
}

export const playDisk = (): Thunk => async (dispatch, getState) => {
  Keyboard.dismiss()

  dispatch(player.actions.wait())

  await delay(Math.pow(2, 4))

  const state = getState()
  const disk = selectActiveDisk(state)
  const html = write(disk)

  dispatch(player.actions.play(html))
}

export const renameDisk = (name: string): Thunk => async (
  dispatch,
  getState
) => {
  const action = slice.actions.rename(name)

  dispatch(action)

  const state = getState()
  const disk = selectActiveDisk(state)
  await AsyncStorage.setItem(disk.uri, JSON.stringify(disk))
}

export const saveSnapshot = (png: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.snapshot(png))

  const state = getState()
  const disk = selectActiveDisk(state)
  await AsyncStorage.setItem(disk.uri, JSON.stringify(disk))
}

export const stopDisk = (): Thunk => async (dispatch, getState) => {
  dispatch(player.actions.shutdown())
  await delay(400)
  dispatch(player.actions.stop())
}

export const selectDisks = ({ disks }) => _.values(disks)

export const selectNormalDisks = createSelector([selectDisks], (disks) =>
  _.filter(disks, { type: DiskType.normal })
)

export const selectActiveDisk = createSelector([selectDisks], (disks) =>
  _.find(disks, "active")
)

export default slice
