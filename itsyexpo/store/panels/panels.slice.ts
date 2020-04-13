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

export interface Panel {
  id: PanelIds
  active: boolean
  rank: number
}

export interface PanelsState {
  [id: string]: Panel
}

const name = "panels"

const initialState: PanelsState = {}

const reducers = {
  hide(panels, action: PayloadAction<PanelIds>) {
    panels[action.payload].active = false
  },

  show(panels, action: PayloadAction<PanelIds>) {
    panels[action.payload].active = true
  },

  swap(panels, action: PayloadAction<PanelIds>) {
    _.find(panels, "active").active = false
    panels[action.payload].active = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const togglePanel = (id: PanelIds): Thunk => async (
  dispatch,
  getState
) => {
  const state = getState()
  const panelMode = selectPanelMode(state)
  const activePanels = selectActivePanels(state)
  const panel: Panel = state.panels[id]

  if (panelMode === PanelModes.slide) {
    dispatch(slice.actions.swap(id))
    return
  }

  if (panel.active) {
    if (activePanels.length > 1) {
      dispatch(slice.actions.hide(id))
    }
  } else {
    dispatch(slice.actions.show(id))
  }
}

export const selectPanels = ({ panels }): PanelsState => panels

export const selectDevtoolsPanels = createSelector(
  [selectPanels],
  (panels): Panel[] =>
    _.filter(panels, (p) => ![PanelIds.disk, PanelIds.help].includes(p.id))
)

export const selectActivePanel = createSelector(
  [selectPanels],
  (panels): Panel => _.find(panels, "active")
)

export const selectActivePanels = createSelector(
  [selectPanels],
  (panels): Panel[] => _.filter(panels, "active")
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
