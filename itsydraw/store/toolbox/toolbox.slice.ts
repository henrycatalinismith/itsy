import { Thunk } from "@highvalley.systems/itsydraw/store"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ToolboxToolIds {
  Brush = "Brush",
  Camera = "Camera",
  Select = "Select",
}

export enum ToolboxLayouts {
  Crowded = "Crowded",
  Stacked = "Stacked",
}

export interface ToolboxState {
  layout: ToolboxLayouts
  rect: Rect
  tool: ToolboxToolIds
  tools: ToolboxToolIds[]
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
  tool: ToolboxToolIds.Brush,
  // tool: ToolboxToolIds.Camera,
  tools: [ToolboxToolIds.Brush, ToolboxToolIds.Camera, ToolboxToolIds.Select],
}

const reducers = {
  layout(toolbox, action: PayloadAction<Rect>): void {
    toolbox.rect = action.payload

    toolbox.layout = ToolboxLayouts.Crowded
    if (toolbox.rect.width * 2 < toolbox.rect.height) {
      toolbox.layout = ToolboxLayouts.Stacked
    }
  },

  tool(toolbox, action: PayloadAction<ToolboxToolIds>): void {
    toolbox.tool = action.payload
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

export const updateToolboxTool = (tool: ToolboxToolIds): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.tool(tool))
}

export const selectToolbox = ({ toolbox }) => toolbox

export const selectToolboxTool = createSelector(
  [selectToolbox],
  (toolbox): ToolboxToolIds => toolbox.tool
)

export const selectToolboxTools = createSelector(
  [selectToolbox],
  (toolbox): ToolboxToolIds[] => toolbox.tools
)

export default slice
