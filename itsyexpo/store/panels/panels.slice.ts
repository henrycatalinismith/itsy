import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { selectDevice } from "@highvalley.systems/itsyexpo/store/device"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

export enum PanelIds {
  code = "code",
  disk = "disk",
  play = "play",
  draw = "draw",
  help = "help",
}

export enum PanelModes {
  slide = "slide",
  tiles = "tiles",
}

export enum PanelVisibilities {
  Visible = "Visible",
  Hidden = "Hidden",
}

export interface Panel {
  id: PanelIds
  visibility: PanelVisibilities
  rank: number
}

export interface CodePanel extends Panel {
  id: PanelIds.code
}

export enum DiskPanelModes {
  Blank = "Blank",
  Browse = "Browse",
  Create = "Create",
  Delete = "Delete",
  Inspect = "Inspect",
  Rename = "Rename",
  Share = "Share",
  Sprite = "Sprite",
  Starter = "Starter",
}

export interface DiskPanel extends Panel {
  id: PanelIds.disk
  mode: DiskPanelModes
}

export interface DrawPanel extends Panel {
  id: PanelIds.draw
}

export interface HelpPanel extends Panel {
  id: PanelIds.help
  path: string
}

export interface PlayPanel extends Panel {
  id: PanelIds.play
}

export interface PanelsState {
  [id: string]: CodePanel | DiskPanel | DrawPanel | HelpPanel | PlayPanel
}

const name = "panels"

const initialState: PanelsState = {}

const reducers = {
  hide(panels, action: PayloadAction<PanelIds>) {
    panels[action.payload].visibility = PanelVisibilities.Hidden
  },

  show(panels, action: PayloadAction<PanelIds>) {
    panels[action.payload].visibility = PanelVisibilities.Visible
  },

  swap(panels, action: PayloadAction<PanelIds>) {
    const oldPanel = _.find(panels, { visibility: PanelVisibilities.Visible })
    const newPanel = panels[action.payload]
    oldPanel.visibility = PanelVisibilities.Hidden
    newPanel.visibility = PanelVisibilities.Visible
  },

  diskPanelMode(panels, action: PayloadAction<DiskPanelModes>): void {
    panels.disk.mode = action.payload
  },

  helpPanelPath(panels, action: PayloadAction<string>): void {
    panels.help.path = action.payload
  },
}

const extraReducers = {
  "disk/open": (panels): void => {
    panels.disk.mode = DiskPanelModes.Inspect
  },

  "disk/close": (panels): void => {
    panels.disk.mode = DiskPanelModes.Browse
  },

  "disks/create": (panels): void => {
    panels.disk.mode = DiskPanelModes.Inspect
  },

  "disks/delete": (panels): void => {
    panels.disk.mode = DiskPanelModes.Browse
  },

  "disks/rename": (panels): void => {
    panels.disk.mode = DiskPanelModes.Inspect
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const togglePanel = (id: PanelIds): Thunk => async (
  dispatch,
  getState
) => {
  const state = getState()
  const panelMode = selectPanelMode(state)
  const visiblePanels = selectVisiblePanels(state)
  const panel: Panel = state.panels[id]

  if (panelMode === PanelModes.slide) {
    dispatch(slice.actions.swap(id))
    return
  }

  if (panel.visibility === PanelVisibilities.Visible) {
    if (visiblePanels.length > 1) {
      dispatch(slice.actions.hide(id))
    }
  } else {
    dispatch(slice.actions.show(id))
  }
}

export const setDiskPanelMode = (mode: DiskPanelModes): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.diskPanelMode(mode))
}

export const setHelpPanelPath = (path: string): Thunk => async (dispatch) => {
  dispatch(slice.actions.helpPanelPath(path))
}

export const selectPanels = ({ panels }): PanelsState => panels

export const selectDevtoolsPanels = createSelector(
  [selectPanels],
  (panels): Panel[] =>
    _.filter(panels, (p) => ![PanelIds.disk, PanelIds.help].includes(p.id))
)

export const selectVisiblePanel = createSelector(
  [selectPanels],
  (panels): Panel => _.find(panels, { visibility: PanelVisibilities.Visible })
)

export const selectVisiblePanels = createSelector(
  [selectPanels],
  (panels): Panel[] =>
    _.filter(panels, { visibility: PanelVisibilities.Visible })
)

export const selectDiskPanel = createSelector(
  [selectPanels],
  (panels): DiskPanel => panels.disk as DiskPanel
)

export const selectDiskPanelMode = createSelector(
  [selectDiskPanel],
  (diskPanel): DiskPanelModes => diskPanel.mode
)

export const selectHelpPanel = createSelector(
  [selectPanels],
  (panels): HelpPanel => panels.help as HelpPanel
)

export const selectHelpPanelPath = createSelector(
  [selectHelpPanel],
  (helpPanel): string => helpPanel.path
)

export const selectPanelMode = createSelector([selectDevice], (device) => {
  if (device.modelName.match(/iPad/)) {
    return PanelModes.tiles
  } else {
    return PanelModes.slide
  }
})

export const selectRankedPanels = createSelector(
  [selectPanels],
  (panels): Panel[] => _.sortBy(panels, "rank")
)

export default slice
