import {
  palette as defaultPalette,
  snapshot as defaultSnapshot,
  spritesheet as defaultSpritesheet,
} from "@highvalley.systems/itsyexpo/defaults"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { appendOutput } from "@highvalley.systems/itsyexpo/store/output"
import player from "@highvalley.systems/itsyexpo/store/player"
import {
  deleteValue,
  readValues,
  writeValue,
} from "@highvalley.systems/itsyexpo/store/storage"
import * as itsy from "@highvalley.systems/itsyplay"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import _ from "lodash"
import { Keyboard } from "react-native"
import uuid from "uuid"

const dWrite = _.debounce((dispatch: any, disk: any) => {
  dispatch(writeValue(disk.uri, disk))
}, Math.pow(2, 9))

function makeUri(id = uuid()): string {
  return `itsystudio://disk/${id}`
}

export enum DiskTypes {
  Empty = "Empty",
  Normal = "Normal",
}

export interface Disk {
  id: string
  uri: string
  name: string
  lua: string
  palette: string
  snapshot: string
  spritesheet: string
  created: string
  updated: string
}

interface DiskState {
  [id: string]: Disk
}

const name = "disks"

const initialState: DiskState = {}

const reducers = {
  load(disks, action: PayloadAction<Disk[]>) {
    action.payload.forEach((disk) => {
      disks[disk.id] = {
        ...disk,
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
      created: action.payload.created,
      updated: action.payload.updated,
    }
  },

  delete(disks, action: PayloadAction<string>) {
    delete disks[action.payload]
  },

  rename(disks, action: PayloadAction<{ id: string; name: string }>) {
    const { id, name } = action.payload
    disks[id].name = name
    disks[id].updated = new Date().toISOString()
  },

  edit(disks, action: PayloadAction<{ id: string; lua: string }>) {
    const { id, lua } = action.payload
    disks[id].lua = lua
    disks[id].updated = new Date().toISOString()
  },

  snapshot(disks, action: PayloadAction<{ id: string; snapshot: string }>) {
    const { id, snapshot } = action.payload
    disks[id].snapshot = snapshot
    disks[id].updated = new Date().toISOString()
  },

  spritesheet(
    disks,
    action: PayloadAction<{ id: string; spritesheet: string }>
  ) {
    const { id, spritesheet } = action.payload
    disks[id].spritesheet = spritesheet
    disks[id].updated = new Date().toISOString()
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const changeDiskSpritesheet = (
  id: string,
  spritesheet: string
): Thunk => async (dispatch, getState) => {
  const action = slice.actions.spritesheet({ id, spritesheet })
  dispatch(action)

  const disk = getState().disks[id]
  dispatch(writeValue(disk.uri, disk))
}

export const createDisk = (partialDisk: Partial<Disk>): Thunk => async (
  dispatch
) => {
  const id = uuid()
  const uri = makeUri(id)
  const name = partialDisk.name || ""
  const lua = partialDisk.lua || ""
  const palette = partialDisk.palette || defaultPalette
  const snapshot = partialDisk.snapshot || defaultSnapshot
  const spritesheet = partialDisk.spritesheet || defaultSpritesheet
  const created = new Date().toISOString()
  const updated = created

  const disk: Disk = {
    ...partialDisk,
    id,
    uri,
    name,
    lua,
    palette,
    snapshot,
    spritesheet,
    created,
    updated,
  }

  await dispatch(slice.actions.create(disk))
  await dispatch(writeValue(disk.uri, disk))

  return disk
}

export const copyDisk = (oldId: string, name: string): Thunk => async (
  dispatch,
  getState
) => {
  const oldDisk = getState().disks[oldId]

  const id = uuid()
  const uri = makeUri(id)
  const updated = new Date().toISOString()

  const newDisk: Disk = {
    ...oldDisk,
    id,
    uri,
    name,
    updated,
  }

  return await dispatch(createDisk(newDisk))
}

export const createBlankDisk = (name: string): Thunk => async (dispatch) => {
  const lua = [
    "function _init()",
    "end",
    "",
    "function _tick()",
    "end",
    "",
    "function _draw()",
    "end",
    "",
  ].join("\n")
  return await dispatch(createDisk({ name, lua }))
}

export const deleteDisk = (id: string): Thunk => async (dispatch, getState) => {
  const disk = getState().disks[id]
  const action = slice.actions.delete(id)

  dispatch(action)
  dispatch(deleteValue(disk.uri))
}

export const editDisk = (id: string, lua: string): Thunk => async (
  dispatch,
  getState
) => {
  const d = getState().disks[id]
  dispatch(slice.actions.edit({ id: d.id, lua }))

  const state = getState()
  const disk = getState().disks[id]

  dWrite(dispatch, disk)
}

export const loadDisks = (): Thunk => async (dispatch) => {
  const diskStrings = await dispatch(readValues(/^itsystudio:\/\/disk/))
  const disks = diskStrings.map(
    ([uri, diskString]): Disk => {
      const disk: Disk = JSON.parse(diskString)
      return disk
    }
  )

  dispatch(slice.actions.load(disks))
}

export const playDisk = (disk: Disk): Thunk => async (dispatch, getState) => {
  Keyboard.dismiss()

  await dispatch(appendOutput(disk.id, [`running ${disk.name}`]))
  const html = itsy.write(disk)

  dispatch(player.actions.play(html))
}

export const renameDisk = (id: string, name: string): Thunk => async (
  dispatch,
  getState
) => {
  const action = slice.actions.rename({ id, name })
  dispatch(action)

  const disk = getState().disks[id]
  dispatch(writeValue(disk.uri, disk))
}

export const saveSnapshot = (id: string, snapshot: string): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.snapshot({ id, snapshot }))

  const state = getState()
  const disk = state.disks[id]
  dispatch(writeValue(disk.uri, disk))
}

export const shareDisk = (id: string): Thunk => async (dispatch, getState) => {
  const disk = getState().disks[id]
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
  dispatch(player.actions.halt())
  await delay(400)
  dispatch(player.actions.idle())
}

export const updateSpritesheet = (
  id: string,
  spritesheet: string
): Thunk => async (dispatch, getState) => {
  dispatch(slice.actions.spritesheet({ id, spritesheet }))

  const disk = getState().disks[id]
  dispatch(writeValue(disk.uri, disk))
}

export const selectDisks = ({ disks }) => _.values(disks)

export const selectDisksForBrowsePanel = createSelector(
  [selectDisks],
  (disks) => _.orderBy(disks, ["updated"], ["desc"])
)

export default slice
