import _ from "lodash"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"
import { selectDevice } from "@itsy.studio/studio/store/device"

export enum PanelId {
  code = "code",
  disks = "disks",
  play = "play",
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

const initialState: PanelsState = {
  disks: {
    id: PanelId.disks,
    active: true,
    rank: 0,
  },

  code: {
    id: PanelId.code,
    active: false,
    rank: 1,
  },

  play: {
    id: PanelId.play,
    active: false,
    rank: 2,
  },

  help: {
    id: PanelId.help,
    active: false,
    rank: 3,
  },
}

const reducers = {
  togglePanel(panels, action: PayloadAction<PanelId>) {
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

  if (panelMode === PanelMode.slide) {
    dispatch(slice.actions.togglePanel(id))
    return
  }

  console.log("tile time")
}

export const selectPanels = ({ panels }): PanelsState => panels

export const selectActivePanel = createSelector(
  [selectPanels],
  (panels): Panel => {
    return _.find(panels, "active")
  }
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
