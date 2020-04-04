import {
  palette,
  snapshot as defaultSnapshot,
  spritesheet,
} from "@highvalley.systems/itsyexpo/defaults"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { selectDisk } from "@highvalley.systems/itsyexpo/store/disk"
import player from "@highvalley.systems/itsyexpo/store/player"
import {
  deleteValue,
  readValues,
  writeValue,
} from "@highvalley.systems/itsyexpo/store/storage"
import words from "@highvalley.systems/itsyexpo/words"
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

export const changeDiskSpritesheet = (uri: string): Thunk => async (
  dispatch,
  getState
) => {
  const d = selectActiveDisk(getState())
  const action = slice.actions.spritesheet({ id: d.id, spritesheet: uri })

  dispatch(action)

  const state = getState()
  const disk = selectInspectedDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const createDisk = (): Thunk => async (dispatch, getState) => {
  const id = uuid()
  const uri = makeUri(id)
  const name = words()
  const lua = `function _init()
end

function _tick()
end

function _draw()
end
`
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
  const d = selectActiveDisk(getState())
  dispatch(slice.actions.edit({ id: d.id, lua }))

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
      return disk
    }
  )

  dispatch(slice.actions.load(disks))
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
  const d = selectActiveDisk(getState())
  const action = slice.actions.rename({ id: d.id, name })

  dispatch(action)

  const state = getState()
  const disk = selectInspectedDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const saveSnapshot = (png: string): Thunk => async (
  dispatch,
  getState
) => {
  const d = selectActiveDisk(getState())
  dispatch(slice.actions.snapshot({ id: d.id, snapshot: png }))

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
  const d = selectActiveDisk(getState())
  dispatch(slice.actions.spritesheet({ id: d.id, spritesheet: png }))

  const state = getState()
  const disk = selectActiveDisk(state)
  dispatch(writeValue(disk.uri, disk))
}

export const selectDisks = ({ disks }) => _.values(disks)

export const selectNormalDisks = createSelector([selectDisks], (disks) =>
  _.filter(disks, { type: DiskType.normal })
)

export const selectActiveDisk = createSelector(
  [selectDisks, selectDisk],
  (disks, disk) => _.find(disks, { id: disk })
)

export const selectInspectedDisk = createSelector([selectDisks], (disks) =>
  _.find(disks, "inspect")
)

export default slice
