import * as Sharing from "expo-sharing"
import { AsyncStorage } from "react-native"
import * as FileSystem from "expo-file-system"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"
import _ from "lodash"
import { Keyboard } from "react-native"
import uuid from "uuid"
import * as itsy from "@highvalley.systems/itsyplay"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import player from "@highvalley.systems/itsyexpo/store/player"
import {
  deleteValue,
  readValues,
  writeValue,
} from "@highvalley.systems/itsyexpo/store/storage"
import {
  palette,
  snapshot as defaultSnapshot,
  spritesheet,
} from "@highvalley.systems/itsyexpo/defaults"
import words from "@highvalley.systems/itsyexpo/words"

const dWrite = _.debounce((dispatch: any, disk: any) => {
  dispatch(writeValue(disk.uri, disk))
}, Math.pow(2, 9))

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
  inspect: boolean
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
    inspect: false,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  },
}

const reducers = {
  load(disks, action: PayloadAction<Disk[]>) {
    action.payload.forEach((disk) => {
      disks[disk.id] = {
        ...disk,
        active: false,
        inspect: false,
      }
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
      inspect: action.payload.inspect,
      type: action.payload.type,
      created: action.payload.created,
      updated: action.payload.updated,
    }
  },

  delete(disks, action: PayloadAction<string>) {
    delete disks[action.payload]
  },

  dismiss(disks, action: PayloadAction<string>) {
    disks[action.payload].inspect = false
  },

  inspect(disks, action: PayloadAction<string>) {
    _.filter(disks, "inspect").forEach((disk) => {
      disk.inspect = false
    })
    disks[action.payload].inspect = true
  },

  open(disks, action: PayloadAction<string>) {
    _.filter(disks, "active").forEach((disk) => {
      disk.active = false
    })
    disks[action.payload].active = true
  },

  rename(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "inspect")
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

  spritesheet(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.spritesheet = action.payload
    disk.updated = new Date().toISOString()
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const changeDiskSpritesheet = (uri: string): Thunk => async (
  dispatch,
  getState
) => {
  const action = slice.actions.spritesheet(uri)

  dispatch(action)

  const state = getState()
  const disk = selectInspectedDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const createDisk = (): Thunk => async (dispatch, getState) => {
  const id = uuid()
  const uri = makeUri(id)
  const name = words()
  const lua = ""
  const active = false
  const inspect = false
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
    inspect,
    created,
    updated,
  }

  dispatch(slice.actions.create(disk))
  dispatch(writeValue(disk.uri, disk))
}

export const deleteDisk = (id: string): Thunk => async (dispatch, getState) => {
  const state = getState()
  const disk = selectInspectedDisk(state)

  dispatch(slice.actions.delete(id))
  dispatch(deleteValue(disk.uri))
}

export const dismissDisk = (id: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.dismiss(id))
}

export const editDisk = (lua: string): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.edit(lua))

  const state = getState()
  const disk = selectActiveDisk(state)

  if (disk.type === DiskType.empty) {
    return
  }

  dWrite(dispatch, disk)
}

export const inspectDisk = (id: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.inspect(id))
}

export const loadDisks = (): Thunk => async (dispatch) => {
  const diskStrings = await dispatch(readValues(/^itsystudio:\/\/disk/))
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
  const html = itsy.write(disk)

  dispatch(player.actions.play(html))
}

export const renameDisk = (name: string): Thunk => async (
  dispatch,
  getState
) => {
  const action = slice.actions.rename(name)

  dispatch(action)

  const state = getState()
  const disk = selectInspectedDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const saveSnapshot = (png: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.snapshot(png))

  const state = getState()
  const disk = selectActiveDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const shareDisk = (): Thunk => async (dispatch, getState) => {
  const state = getState()
  const disk = selectInspectedDisk(state)
  const html = itsy.write(disk)

  const slug = disk.name.replace(/[^a-z0-9]/gi, "-")

  const uri = `${FileSystem.documentDirectory}${slug}.html`
  await FileSystem.writeAsStringAsync(uri, html)

  const sharingOptions = {
    dialogTitle: `Share ${disk.name}`,
    mimeType: "text/html",
    UTI: "text/html",
  }

  await Sharing.shareAsync(uri, sharingOptions)
}

export const stopDisk = (): Thunk => async (dispatch, getState) => {
  dispatch(player.actions.shutdown())
  await delay(400)
  dispatch(player.actions.stop())
}

export const updateSpritesheet = (png: string): Thunk => async (
  dispatch,
  getState
) => {
  console.log("UPDATING")
  dispatch(slice.actions.spritesheet(png))

  const state = getState()
  const disk = selectActiveDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const selectDisks = ({ disks }) => _.values(disks)

export const selectNormalDisks = createSelector([selectDisks], (disks) =>
  _.filter(disks, { type: DiskType.normal })
)

export const selectActiveDisk = createSelector(
  [selectDisks],
  (disks) => _.find(disks, "active") || _.find(disks, { type: DiskType.empty })
)

export const selectInspectedDisk = createSelector([selectDisks], (disks) =>
  _.find(disks, "inspect")
)

export default slice
