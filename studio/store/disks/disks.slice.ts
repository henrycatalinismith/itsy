import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import uuid from "uuid"

import { palette, snapshot, spritesheet } from "../../defaults"
import words from "../../words"

interface Disk {
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

interface DiskRename {
  id: string
  name: string
}

interface DiskEdit {
  id: string
  lua: string
}

const name = "disks"

const initialState: DiskState = {}

const reducers = {
  create(disks, action) {
    const id = uuid()
    const name = words()
    const html = ""
    const lua = ""
    const active = false
    const created = (new Date).toISOString()
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
    _.filter(disks, { active: true }).forEach(disk => {
      disk.active = false
    })
    disks[action.payload].active = true
  },

  rename(disks, action: PayloadAction<DiskRename>) {
    const { id, name } = action.payload
    disks[id].name = name
    disks[id].updated = new Date
  },

  edit(disks, action: PayloadAction<DiskEdit>) {
    const { id, lua } = action.payload
    disks[id].lua = lua
    disks[id].updated = new Date
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const allDisks = ({ disks }) => _.values(disks)

export const activeDisk = createSelector(
  [allDisks],
  (disks) => _.find(disks, { active: true })
)

export default slice
