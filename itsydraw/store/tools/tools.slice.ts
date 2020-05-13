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

export enum BrushModes {
  Pencil = "Pencil",
  Line = "Line",
  Circle = "Circle",
}

export enum LineAngles {
  Free = "Free",
  Snap = "Snap",
}

export interface BrushState extends ToolState {
  id: ToolIds.Brush
  brushes: BrushesState
}

export enum BrushModeStatuses {
  Active = "Active",
  Inactive = "Inactive",
}

export interface BrushModeState {
  id: BrushModes
  status: BrushModeStatuses
}

export interface PencilBrushState extends BrushModeState {
  id: BrushModes.Pencil
  color: PaletteIndex
  size: BrushSizes
}

export interface LineBrushState extends BrushModeState {
  id: BrushModes.Line
  color: PaletteIndex
  size: BrushSizes
  angle: LineAngles
}

export interface CircleBrushState extends BrushModeState {
  id: BrushModes.Circle
  color: PaletteIndex
  size: BrushSizes
}

export interface BrushesState {
  [BrushModes.Circle]: CircleBrushState
  [BrushModes.Line]: LineBrushState
  [BrushModes.Pencil]: PencilBrushState
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
    status: ToolStatuses.Inactive,
    rank: 0,
    brushes: {
      [BrushModes.Pencil]: {
        id: BrushModes.Pencil,
        status: BrushModeStatuses.Active,
        color: 7,
        size: 1,
      },

      [BrushModes.Line]: {
        id: BrushModes.Line,
        status: BrushModeStatuses.Inactive,
        size: 1,
        color: 7,
        angle: LineAngles.Free,
      },

      [BrushModes.Circle]: {
        id: BrushModes.Circle,
        status: BrushModeStatuses.Inactive,
        color: 7,
        size: 1,
      },
    },
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
    status: ToolStatuses.Active,
    rank: 3,
    rect: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
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
    tools[ToolIds.Brush].brushes[BrushModes.Circle].color = action.payload
    tools[ToolIds.Brush].brushes[BrushModes.Line].color = action.payload
    tools[ToolIds.Brush].brushes[BrushModes.Pencil].color = action.payload
  },

  brushMode(tools, action: PayloadAction<BrushModes>): void {
    const oldMode =
      tools[ToolIds.Brush].brushes[selectActiveBrushMode({ tools })]
    const newMode = tools[ToolIds.Brush].brushes[action.payload]
    oldMode.status = BrushModeStatuses.Inactive
    newMode.status = BrushModeStatuses.Active
  },

  brushSize(tools, action: PayloadAction<BrushSizes>): void {
    tools[ToolIds.Brush].brushes[selectActiveBrushMode({ tools })].size =
      action.payload
  },

  lineAngle(tools, action: PayloadAction<LineAngles>): void {
    tools[ToolIds.Brush].brushes[BrushModes.Line].angle = action.payload
  },

  clipboard(tools, action: PayloadAction<Rect>): void {
    tools[ToolIds.Clipboard].rect = action.payload
  },

  palette(tools, action: PayloadAction<Palette>): void {
    tools[ToolIds.Palette].colors = action.payload
  },

  pan(tools, action: PayloadAction<Point>): void {
    const camera = tools[ToolIds.Camera]
    camera.x = _.clamp(action.payload.x, 0, 127 - camera.width)
    camera.y = _.clamp(action.payload.y, 0, 127 - camera.height)
  },

  zoom(tools, action: PayloadAction<number>): void {
    const camera = tools[ToolIds.Camera]
    camera.width = 128 / action.payload
    camera.height = 128 / action.payload
    camera.x = _.clamp(camera.x, 0, 127 - camera.width)
    camera.y = _.clamp(camera.y, 0, 127 - camera.height)
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

export const changeBrushMode = (type: BrushModes): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.brushMode(type))
}

export const changeLineBrushAngle = (angle: LineAngles): Thunk => async (
  dispatch
) => {
  dispatch(slice.actions.lineAngle(angle))
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

export const selectBrushes = createSelector(
  [selectBrush],
  (brush): BrushesState => brush.brushes
)

export const selectCircleBrush = createSelector(
  [selectBrushes],
  (brushes): CircleBrushState => brushes[BrushModes.Circle]
)

export const selectLineBrush = createSelector(
  [selectBrushes],
  (brushes): LineBrushState => brushes[BrushModes.Line]
)

export const selectPencilBrush = createSelector(
  [selectBrushes],
  (brushes): PencilBrushState => brushes[BrushModes.Pencil]
)

export const selectActiveBrushMode = createSelector(
  [selectBrushes],
  (brushes): BrushModes =>
    _.find(brushes, { status: BrushModeStatuses.Active }).id
)

export const selectBrushColor = createSelector(
  [selectBrushes, selectActiveBrushMode, selectPalette],
  (brushes, mode, palette): PaletteColor => palette[brushes[mode].color]
)

export const selectBrushSize = createSelector(
  [selectBrushes, selectActiveBrushMode],
  (brushes, mode): BrushSizes => brushes[mode].size
)

export const selectLineBrushAngle = createSelector(
  [selectLineBrush],
  (line): LineAngles => line.angle
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
