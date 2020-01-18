import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as FileSystem from "expo-file-system"
import delay from "delay"
import _ from "lodash"
import { Keyboard } from "react-native"
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

export enum DiskType {
  empty = "empty",
  normal = "normal",
}

export interface Disk {
  id: string
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
  load(disks, action: PayloadAction<Disk>) {
    disks[action.payload.id] = action.payload
  },

  create(disks, action: PayloadAction<Disk>) {
    disks[action.payload.id] = {
      id: action.payload.id,
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

  build(disks) {
    const disk = _.find(disks, "active")
    disk.updated = new Date().toISOString()
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

function filename(diskName: string): string {
  const root = FileSystem.documentDirectory
  const base = diskName.replace(/[^a-z0-9]/gi, "-")
  const name = `${root}${base}.html`
  return name
}

export const createDisk = (): Thunk => async (dispatch, getState) => {
  const id = uuid()
  const name = words()
  const lua = ""
  const active = false
  const created = new Date().toISOString()
  const updated = created
  const disk: Disk = {
    id,
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

  const html = write(disk)
  const uri = filename(disk.name)
  await FileSystem.writeAsStringAsync(uri, html)

  dispatch(slice.actions.create(disk))
}

export const loadDisks = (): Thunk => async (dispatch) => {
  const dir = FileSystem.documentDirectory
  const list = await FileSystem.readDirectoryAsync(dir)
  const diskNames = list.filter((name) => name.match(/\.html$/))

  for (const name of diskNames) {
    const uri = `${dir}${name}`
    const html = await FileSystem.readAsStringAsync(uri)
    const raw = read(html)

    const disk: Disk = {
      id: raw.id,
      name: raw.name,
      lua: raw.lua,
      palette: raw.palette,
      snapshot: raw.snapshot,
      spritesheet: raw.spritesheet,
      active: false,
      type: DiskType.normal,
      created: raw.created,
      updated: raw.updated,
    }

    dispatch(slice.actions.load(disk))
  }
}

export const openDisk = (id: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.open(id))
}

export const playDisk = (): Thunk => async (dispatch, getState) => {
  Keyboard.dismiss()

  dispatch(player.actions.wait())
  dispatch(slice.actions.build())

  await delay(100)

  const state = getState()
  const disk = selectActiveDisk(state)
  const html = write(disk)

  await delay(100)

  const name = filename(disk.name)
  await FileSystem.writeAsStringAsync(name, html)

  dispatch(player.actions.play(html))
}

export const renameDisk = (name: string): Thunk => async (
  dispatch,
  getState
) => {
  const state = getState()
  const disk = selectActiveDisk(state)

  const action = slice.actions.rename(name)
  const oldName = filename(disk.name)
  const newName = filename(name)

  const newDisk = { ...disk, name }
  const newHtml = write(newDisk)

  await FileSystem.deleteAsync(oldName)
  await FileSystem.writeAsStringAsync(newName, newHtml)

  dispatch(action)
}

export const saveSnapshot = (png: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.snapshot(png))

  const state = getState()
  const disk = selectActiveDisk(state)
  const html = write(disk)
  const name = filename(disk.name)

  await FileSystem.writeAsStringAsync(name, html)
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
