import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsydraw/store"
import pico8 from "@highvalley.systems/palettes/pico8"
import {
  Rect,
  Palette,
  PaletteColor,
  PaletteIndex,
  Point,
} from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum ToolIds {
  Brush = "Brush",
  Camera = "Camera",
  Palette = "Palette",
  Clipboard = "Clipboard",
}

export enum ToolStatuses {
  Active = "Active",
  Inactive = "Inactive",
}

export interface ToolState {
  id: ToolIds
  status: ToolStatuses
  rank: number
}

export type BrushSizes = 1 | 2 | 4 | 8

export enum BrushTypes {
  Pencil = "Pencil",
  Line = "Line",
  Circle = "Circle",
}

export interface BrushState extends ToolState {
  id: ToolIds.Brush
  size: BrushSizes
  type: BrushTypes
  color: PaletteIndex
}

export interface CameraState extends ToolState, Rect {
  id: ToolIds.Camera
}

export interface ClipboardState extends ToolState {
  id: ToolIds.Clipboard
  rect: Rect
}

export interface PaletteState extends ToolState {
  id: ToolIds.Palette
  colors: Palette
}

export type Tool = BrushState | CameraState | ClipboardState | PaletteState

export interface ToolsState {
  [id: string]: Tool
}

const name = "tools"

const initialState: ToolsState = {
  [ToolIds.Brush]: {
    id: ToolIds.Brush,
    status: ToolStatuses.Active,
    rank: 0,
    type: BrushTypes.Circle,
    size: 1,
    color: 7,
  },

  [ToolIds.Palette]: {
    id: ToolIds.Palette,
    status: ToolStatuses.Inactive,
    rank: 1,
    colors: _.zipObject(
      _.range(16),
      _.range(16).map((id) => ({
        id,
        hex: pico8[id],
      }))
    ),
  },

  [ToolIds.Camera]: {
    id: ToolIds.Camera,
    status: ToolStatuses.Inactive,
    rank: 2,
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  },

  [ToolIds.Clipboard]: {
    id: ToolIds.Clipboard,
    status: ToolStatuses.Inactive,
    rank: 3,
    rect: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  },
}

const reducers = {
  activate(tools, action: PayloadAction<ToolIds>): void {
    const oldTool = selectActiveTool({ tools })
    const newTool = tools[action.payload]
    oldTool.status = ToolStatuses.Inactive
    newTool.status = ToolStatuses.Active
  },

  brushColor(tools, action: PayloadAction<PaletteIndex>): void {
    tools[ToolIds.Brush].color = action.payload
  },

  brushSize(tools, action: PayloadAction<BrushSizes>): void {
    tools[ToolIds.Brush].size = action.payload
  },

  brushType(tools, action: PayloadAction<BrushTypes>): void {
    tools[ToolIds.Brush].type = action.payload
  },

  clipboard(tools, action: PayloadAction<Rect>): void {
    tools[ToolIds.Clipboard].rect = action.payload
  },

  palette(tools, action: PayloadAction<Palette>): void {
    tools[ToolIds.Palette].colors = action.payload
  },

  pan(tools, action: PayloadAction<Point>): void {
    tools[ToolIds.Camera].x = action.payload.x
    tools[ToolIds.Camera].y = action.payload.y
  },

  zoom(tools, action: PayloadAction<number>): void {
    tools[ToolIds.Camera].width = 128 / action.payload
    tools[ToolIds.Camera].height = 128 / action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const changeActiveTool = (id: ToolIds): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.activate(id))
}

export const changeBrushColor = (index: PaletteIndex): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.brushColor(index))
}

export const changeBrushSize = (size: BrushSizes): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.brushSize(size))
}

export const changeBrushType = (type: BrushTypes): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.brushType(type))
}

export const panCamera = (x: number, y: number): Thunk => async (
  dispatch,
  getState
) => {
  const camera = selectCamera(getState())
  // const point = {
  // x: Math.round(x / camera.width) * (camera.width - 1),
  // y: Math.round(y / camera.height) * (camera.height - 1),
  // }
  const point = {
    x,
    y,
  }

  if (point.x === camera.x && point.y === camera.y) {
    console.log("no", x, y, point.x, point.y)
    return
  }

  dispatch(slice.actions.pan(point))
}

export const zoomCamera = (z: number): Thunk => async (dispatch, getState) => {
  const zoom = selectZoom(getState())
  if (zoom === z || Math.log2(z) % 1 !== 0) {
    return
  }

  dispatch(slice.actions.zoom(z))
}

export const setClipboard = (rect: Rect): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.clipboard(rect))
}

export const selectTools = ({ tools }) => tools

export const selectActiveTool = createSelector(
  [selectTools],
  (tools): Tool => _.find(tools, { status: ToolStatuses.Active })
)

export const selectCamera = createSelector(
  [selectTools],
  (tools): CameraState => tools[ToolIds.Camera]
)

export const selectClipboard = createSelector(
  [selectTools],
  (tools): ClipboardState => tools[ToolIds.Clipboard]
)

export const selectClipboardRect = createSelector(
  [selectClipboard],
  (clipboard): Rect => clipboard.rect
)

export const selectPalette = createSelector(
  [selectTools],
  (tools): Palette => tools[ToolIds.Palette].colors
)

export const selectBrush = createSelector(
  [selectTools],
  (tools): BrushState => tools[ToolIds.Brush]
)

export const selectBrushColor = createSelector(
  [selectBrush, selectPalette],
  (brush, palette): PaletteColor => palette[brush.color]
)

export const selectBrushSize = createSelector(
  [selectBrush],
  (brush): BrushSizes => brush.size
)

export const selectBrushType = createSelector(
  [selectBrush],
  (brush): BrushTypes => brush.type
)

export const selectRankedTools = createSelector(
  [selectTools],
  (tools): Tool[] => _.sortBy(tools, "rank")
)

export const selectZoom = createSelector(
  [selectCamera],
  (camera) => 128 / camera.width
)

export default slice
