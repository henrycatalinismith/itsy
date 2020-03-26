import { Thunk } from "@highvalley.systems/itsydraw/store"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ToolboxTools {
  Pencil = "Pencil",
  Camera = "Camera",
}

export enum ToolboxLayouts {
  Crowded = "Crowded",
  Stacked = "Stacked",
}

export interface ToolboxState {
  layout: ToolboxLayouts
  rect: Rect
  tool: ToolboxTools
  tools: ToolboxTools[]
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
  tool: ToolboxTools.Pencil,
  tools: [ToolboxTools.Pencil, ToolboxTools.Camera],
}

const reducers = {
  layout(toolbox, action: PayloadAction<Rect>): void {
    toolbox.rect = action.payload

    toolbox.layout = ToolboxLayouts.Crowded
    if (toolbox.rect.width * 2 < toolbox.rect.height) {
      toolbox.layout = ToolboxLayouts.Stacked
    }
  },

  tool(toolbox, action: PayloadAction<ToolboxTools>): void {
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

export const updateToolboxTool = (tool: ToolboxTools): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.tool(tool))
}

export const selectToolbox = ({ toolbox }) => toolbox

export const selectToolboxTool = createSelector(
  [selectToolbox],
  (toolbox): ToolboxTools => toolbox.tool
)

export const selectToolboxTools = createSelector(
  [selectToolbox],
  (toolbox): ToolboxTools[] => toolbox.tools
)

export default slice
