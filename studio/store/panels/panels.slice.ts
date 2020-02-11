import _ from "lodash"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"
import { selectDevice } from "@itsy.studio/studio/store/device"

export enum PanelId {
  code = "code",
  disks = "disks",
  play = "play",
  draw = "draw",
  help = "help",
}

export enum PanelMode {
  slide = "slide",
  tiles = "tiles",
}

export interface Panel {
  id: PanelId
  active: boolean
  rank: number
}

export interface PanelsState {
  [id: string]: Panel
}

const name = "panels"

const initialState: PanelsState = {}

const reducers = {
  hide(panels, action: PayloadAction<PanelId>) {
    panels[action.payload].active = false
  },

  show(panels, action: PayloadAction<PanelId>) {
    panels[action.payload].active = true
  },

  swap(panels, action: PayloadAction<PanelId>) {
    _.find(panels, "active").active = false
    panels[action.payload].active = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const togglePanel = (id: PanelId): Thunk => async (
  dispatch,
  getState
) => {
  const state = getState()
  const panelMode = selectPanelMode(state)
  const activePanels = selectActivePanels(state)
  const panel: Panel = state.panels[id]

  if (panelMode === PanelMode.slide) {
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
    return PanelMode.tiles
  } else {
    return PanelMode.slide
  }
})

export const selectRankedPanels = createSelector(
  [selectPanels],
  (panels): Panel[] => _.sortBy(panels, "rank")
)

export default slice
