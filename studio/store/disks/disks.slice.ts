import * as FileSystem from "expo-file-system"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import uuid from "uuid"

import itsy from "@itsy.studio/itsy"
import { Thunk } from "@itsy.studio/studio/store"
import { palette, snapshot, spritesheet } from "@itsy.studio/studio/defaults"
import words from "@itsy.studio/studio/words"

export interface Disk {
  id: string
  name: string
  lua: string
  palette: string
  snapshot: string
  spritesheet: string
  active: boolean
  created: Date
  updated: Date
  started: Date | undefined
  stopped: Date | undefined
}

interface DiskState {
  [id: string]: Disk
}

const name = "disks"

const initialState: DiskState = {}

const reducers = {
  load(disks, action: PayloadAction<Disk>) {
    disks[action.payload.id] = action.payload
  },

  create(disks, action) {
    const id = uuid()
    const name = words()
    const html = ""
    const lua = ""
    const active = false
    const created = new Date().toISOString()
    const updated = created
    const disk = {
      id,
      name,
      html,
      lua,
      palette,
      snapshot,
      spritesheet,
      active,
      created,
      updated,
    }
    disks[id] = disk
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

function filename(diskName: string): string {
  const root = FileSystem.documentDirectory
  const base = diskName.replace(/[^a-z0-9]/gi, "-")
  const name = `${root}${base}.html`
  return name
}

export const loadAll = (): Thunk => async (dispatch) => {
  const dir = FileSystem.documentDirectory
  const list = await FileSystem.readDirectoryAsync(dir)
  const diskNames = list.filter((name) => name.match(/\.html$/))

  for (const name of diskNames) {
    console.log(name)
    const uri = `${dir}${name}`
    const html = await FileSystem.readAsStringAsync(uri)
    const raw = itsy.read(html)

    const disk: Disk = {
      id: raw.id,
      name: raw.name,
      lua: raw.lua,
      palette: raw.palette,
      snapshot: raw.snapshot,
      spritesheet: raw.spritesheet,
      active: false,
      created: raw.created,
      updated: raw.updated,
      started: undefined,
      stopped: undefined,
    }

    dispatch(slice.actions.load(disk))
  }
}

export const rename = (name: string): Thunk => async (dispatch, getState) => {
  const state = getState()
  const disk = activeDisk(state)

  const action = slice.actions.rename(name)
  const oldName = filename(disk.name)
  const newName = filename(name)

  const newDisk = { ...disk, name }
  const newHtml = itsy.write(newDisk)

  const { exists } = await FileSystem.getInfoAsync(oldName)
  if (exists) {
    await FileSystem.moveAsync({
      from: oldName,
      to: newName,
    })
    await FileSystem.writeAsStringAsync(newName, newHtml)
  }

  console.log(itsy.read(newHtml))

  dispatch(action)
}

export const allDisks = ({ disks }) => _.values(disks)

export const activeDisk = createSelector([allDisks], (disks) =>
  _.find(disks, "active")
)

export default slice
