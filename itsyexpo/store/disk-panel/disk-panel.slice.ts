import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

export enum DiskPanelModes {
  Browse = "Browse",
  Delete = "Delete",
  Inspect = "Inspect",
  Rename = "Rename",
  Share = "Share",
  Sprite = "Sprite",
}

export interface DiskPanelState {
  mode: DiskPanelModes
}

const name = "diskPanel"

const initialState: DiskPanelState = {
  mode: DiskPanelModes.Browse,
}

const reducers = {
  mode(diskPanel, action: PayloadAction<DiskPanelModes>): void {
    diskPanel.mode = action.payload
  },
}

const extraReducers = {
  "disk/open": (diskPanel): void => {
    diskPanel.mode = DiskPanelModes.Inspect
  },

  "disk/close": (diskPanel): void => {
    diskPanel.mode = DiskPanelModes.Browse
  },

  "disks/delete": (diskPanel): void => {
    diskPanel.mode = DiskPanelModes.Browse
  },

  "disks/rename": (diskPanel): void => {
    diskPanel.mode = DiskPanelModes.Inspect
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const setDiskPanelMode = (mode: DiskPanelModes): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.mode(mode))
}

export const selectDiskPanel = ({ diskPanel }): DiskPanelState => diskPanel

export const selectDiskPanelMode = createSelector(
  [selectDiskPanel],
  (diskPanel): DiskPanelModes => diskPanel.mode
)

export default slice
