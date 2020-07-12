import { Asset } from "expo-asset"
import * as FileSystem from "expo-file-system"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { Disk, createDisk } from "@highvalley.systems/itsyexpo/store/disks"
import * as itsy from "@highvalley.systems/itsyplay"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

interface StartersState {
  [id: string]: Disk
}

const name = "starters"

const initialState: StartersState = {}

const reducers = {
  import(starters, action: PayloadAction<Disk[]>) {
    action.payload.forEach((disk) => {
      starters[disk.id] = {
        ...disk,
      }
    })
  },
}

export const importStarters = (): Thunk => async (dispatch, getState) => {
  const clockAsset = Asset.fromModule(require("../../starters/clock.html"))
  const clockFile = await FileSystem.downloadAsync(
    clockAsset.uri,
    FileSystem.documentDirectory + "clock.html"
  )
  const clockHtml = await FileSystem.readAsStringAsync(clockFile.uri)
  const clockDisk = itsy.read(clockHtml)
  dispatch(slice.actions.import([clockDisk]))
}

export const useStarter = (id: string): Thunk => async (dispatch, getState) => {
  const { starters } = getState()
  const starter = starters[id]
  const disk: Partial<Disk> = {
    lua: starter.lua,
    name: starter.name,
    palette: starter.palette,
    snapshot: starter.snapshot,
    spritesheet: starter.spritesheet,
  }

  return await dispatch(createDisk(disk))
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectStarters = ({ starters }) => _.values(starters)

export default slice
