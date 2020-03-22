import { Thunk } from "@highvalley.systems/itsydraw/store"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ToolboxLayouts {
  Crowded = "Crowded",
  Stacked = "Stacked",
}

export interface ToolboxState {
  layout: ToolboxLayouts
  rect: Rect
}

const name = "toolbox"

const initialState: ToolboxState = {
  layout: ToolboxLayouts.Crowded,
  rect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

const reducers = {
  layout(toolbox, action: PayloadAction<Rect>): void {
    toolbox.rect = action.payload

    toolbox.layout = ToolboxLayouts.Crowded
    if (toolbox.rect.width * 2 < toolbox.rect.height) {
      toolbox.layout = ToolboxLayouts.Stacked
    }
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

// export const selectActiveColor = createSelector(
// [selectColor, selectPalette],
// (color, palette): PaletteColor => palette[color]
// )

export default slice
