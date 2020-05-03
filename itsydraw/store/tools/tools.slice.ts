import _ from "lodash"
import { Thunk } from "@highvalley.systems/itsydraw/store"
import pico8 from "@highvalley.systems/palettes/pico8/original.es6"
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
  Select = "Select",
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

export interface BrushState extends ToolState {
  id: ToolIds.Brush
  color: PaletteIndex
  size: BrushSizes
}

export interface CameraState extends ToolState, Rect {
  id: ToolIds.Camera
}

export interface PaletteState extends ToolState {
  id: ToolIds.Palette
  colors: Palette
}

export interface SelectState extends ToolState {
  id: ToolIds.Select
}

export type Tool = BrushState | CameraState | PaletteState | SelectState

export interface ToolsState {
  [id: string]: Tool
}

const name = "tools"

const initialState: ToolsState = {
  [ToolIds.Brush]: {
    id: ToolIds.Brush,
    status: ToolStatuses.Inactive,
    rank: 0,
    color: 0,
    size: 1,
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
    status: ToolStatuses.Active,
    rank: 2,
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  },

  [ToolIds.Select]: {
    id: ToolIds.Select,
    status: ToolStatuses.Inactive,
    rank: 3,
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
    const brush = tools[ToolIds.Brush]
    brush.color = action.payload
  },

  brushSize(tools, action: PayloadAction<BrushSizes>): void {
    const brush = tools[ToolIds.Brush]
    brush.size = action.payload
  },

  palette(tools, action: PayloadAction<Palette>): void {
    const palette = tools[ToolIds.Palette]
    palette.colors = action.payload
  },

  pan(tools, action: PayloadAction<Point>): void {
    const { x, y } = action.payload
    const camera = tools[ToolIds.Camera]

    camera.x = x
    camera.y = y
    /*
    camera.x = x - camera.width / 2
    camera.y = y - camera.height / 2

    if (camera.x < 0) {
      camera.x = 0
    }

    if (camera.y < 0) {
      camera.y = 0
    }

    if (camera.x + camera.width > 127) {
      camera.x = 127 - camera.width
    }

    if (camera.y + camera.height > 127) {
      camera.y = 127 - camera.height
    }

    camera.x = Math.ceil(camera.x / camera.width) * camera.width
    camera.y = Math.ceil(camera.y / camera.height) * camera.height
    */
  },

  zoom(tools, action: PayloadAction<number>): void {
    const camera = tools[ToolIds.Camera]
    camera.width = 128 / action.payload
    camera.height = 128 / action.payload
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

  if (point.x === camera.x || point.y === camera.y) {
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

export const selectTools = ({ tools }) => tools

export const selectActiveTool = createSelector(
  [selectTools],
  (tools): Tool => _.find(tools, { status: ToolStatuses.Active })
)

export const selectCamera = createSelector(
  [selectTools],
  (tools): CameraState => tools[ToolIds.Camera]
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

export const selectRankedTools = createSelector(
  [selectTools],
  (tools): Tool[] => _.sortBy(tools, "rank")
)

export const selectZoom = createSelector(
  [selectCamera],
  (camera) => 128 / camera.width
)

export default slice
