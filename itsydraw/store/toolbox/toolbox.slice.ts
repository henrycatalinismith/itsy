import { Thunk } from "@highvalley.systems/itsydraw/store"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ToolboxLayouts {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}

export interface ToolboxState {
  layout: ToolboxLayouts
  rect: Rect
}

const name = "toolbox"

const initialState: ToolboxState = {
  layout: ToolboxLayouts.Horizontal,
  rect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

const reducers = {
  layout(tools, action: PayloadAction<Rect>): void {
    tools.rect = action.payload

    tools.layout = ToolboxLayouts.Horizontal
    // if (tools.rect.width < 360) {
    tools.layout = ToolboxLayouts.Vertical
    // }
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const updateToolboxLayout = (rect: Rect): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.layout(rect))
}

export const selectToolbox = ({ toolbox }) => toolbox

export const selectToolboxHeight = createSelector(
  [selectToolbox],
  (toolbox): number => toolbox.rect.height
)

export const selectToolboxLayout = createSelector(
  [selectToolbox],
  (toolbox): ToolboxLayouts => toolbox.layout
)

export default slice
