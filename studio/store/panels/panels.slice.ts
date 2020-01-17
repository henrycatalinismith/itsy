import _ from "lodash"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "@itsy.studio/studio/store"

export enum PanelId {
  code = "code",
  play = "play",
  help = "help",
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
  code: {
    id: PanelId.code,
    active: true,
    rank: 0,
  },

  play: {
    id: PanelId.play,
    active: false,
    rank: 1,
  },

  help: {
    id: PanelId.help,
    active: false,
    rank: 2,
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
  console.log("toggle", id)
  dispatch(slice.actions.togglePanel(id))
}

export const selectPanels = ({ panels }): PanelsState => panels

export const selectActivePanel = createSelector(
  [selectPanels],
  (panels): Panel => {
    return _.find(panels, "active")
  }
)

export const selectRankedPanels = createSelector(
  [selectPanels],
  (panels): Panel[] => _.sortBy(panels, "rank")
)

export default slice
