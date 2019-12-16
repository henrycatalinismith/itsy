import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import uuid from "uuid"

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
    _.filter(disks, "active").forEach(disk => {
      disk.active = false
    })
    disks[action.payload].active = true
  },

  rename(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.name = action.payload
    disk.updated = (new Date).toISOString()
  },

  edit(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.lua = action.payload
    disk.updated = (new Date).toISOString()
  },

  snapshot(disks, action: PayloadAction<string>) {
    const disk = _.find(disks, "active")
    disk.snapshot = action.payload
    disk.updated = (new Date).toISOString()
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
  (disks) => _.find(disks, "active")
)

export default slice
