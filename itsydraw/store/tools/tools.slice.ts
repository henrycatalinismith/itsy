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
  Fill = "Fill",
  Paste = "Paste",
}

export enum LineAngles {
  Free = "Free",
  Snap = "Snap",
}

export enum CircleStyles {
  Stroke = "Stroke",
  Fill = "Fill",
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
  rank: number
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
  style: CircleStyles
}

export interface FillBrushState extends BrushModeState {
  id: BrushModes.Fill
  color: PaletteIndex
}

export interface PasteBrushState extends BrushModeState {
  id: BrushModes.Paste
}

export interface BrushesState {
  [BrushModes.Circle]: CircleBrushState
  [BrushModes.Line]: LineBrushState
  [BrushModes.Pencil]: PencilBrushState
  [BrushModes.Fill]: FillBrushState
  [BrushModes.Paste]: PasteBrushState
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

function initialToolStatus(id: ToolIds): ToolStatuses {
  switch (id) {
    case ToolIds.Brush:
      return ToolStatuses.Active
    case ToolIds.Camera:
      return ToolStatuses.Inactive
    case ToolIds.Clipboard:
      return ToolStatuses.Inactive
    case ToolIds.Palette:
      return ToolStatuses.Inactive
  }
}

const initialState: ToolsState = {
  [ToolIds.Brush]: {
    id: ToolIds.Brush,
    status: initialToolStatus(ToolIds.Brush),
    rank: 0,
    brushes: {
      [BrushModes.Pencil]: {
        id: BrushModes.Pencil,
        status: BrushModeStatuses.Inactive,
        rank: 0,
        color: 8,
        size: 1,
      },

      [BrushModes.Line]: {
        id: BrushModes.Line,
        status: BrushModeStatuses.Inactive,
        rank: 1,
        size: 1,
        color: 8,
        angle: LineAngles.Free,
      },

      [BrushModes.Circle]: {
        id: BrushModes.Circle,
        status: BrushModeStatuses.Inactive,
        rank: 2,
        color: 8,
        size: 1,
        style: CircleStyles.Stroke,
      },

      [BrushModes.Fill]: {
        id: BrushModes.Fill,
        status: BrushModeStatuses.Inactive,
        rank: 3,
        color: 8,
      },

      [BrushModes.Paste]: {
        id: BrushModes.Paste,
        status: BrushModeStatuses.Active,
        rank: 4,
      },
    },
  },

  [ToolIds.Palette]: {
    id: ToolIds.Palette,
    status: initialToolStatus(ToolIds.Palette),
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
    status: initialToolStatus(ToolIds.Camera),
    rank: 2,
    x: 64,
    y: 16,
    width: 32,
    height: 32,
  },

  [ToolIds.Clipboard]: {
    id: ToolIds.Clipboard,
    status: initialToolStatus(ToolIds.Clipboard),
    rank: 3,
    rect: {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
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
    tools[ToolIds.Brush].brushes[BrushModes.Fill].color = action.payload
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

  circleStyle(tools, action: PayloadAction<CircleStyles>): void {
    tools[ToolIds.Brush].brushes[BrushModes.Circle].style = action.payload
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
    tools[ToolIds.Camera] = {
      ...tools[ToolIds.Camera],
      ...applyZoom(tools[ToolIds.Camera], action.payload),
    }
  },
}

export function applyZoom(before: Rect, zoom: number): Rect {
  const width = 128 / zoom
  const height = 128 / zoom
  const x = _.clamp(before.x, 0, 127 - width)
  const y = _.clamp(before.y, 0, 127 - height)
  return { width, height, x, y }
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

export const cycleBrushSize = (): Thunk => async (dispatch, getState) => {
  const currentBrushSize = selectBrushSize(getState())
  const nextBrushSize = {
    [1]: 2,
    [2]: 4,
    [4]: 8,
    [8]: 1,
  }[currentBrushSize] as BrushSizes
  console.log(currentBrushSize, nextBrushSize)
  dispatch(slice.actions.brushSize(nextBrushSize))
}

export const changeBrushMode = (type: BrushModes): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.brushMode(type))
}

export const handleBrushModeTap = (mode: BrushModes): Thunk => async (
  dispatch,
  getState
) => {
  const activeBrushMode = selectActiveBrushMode(getState())
  if (mode !== activeBrushMode) {
    return await dispatch(changeBrushMode(mode))
  }

  if (mode === BrushModes.Pencil) {
    return await dispatch(cycleBrushSize())
  }

  if (mode === BrushModes.Line) {
    return await dispatch(cycleLineAngle())
  }

  if (mode === BrushModes.Circle) {
    return await dispatch(cycleCircleStyle())
  }

  console.log("handle")
}

export const cycleLineAngle = (): Thunk => async (dispatch, getState) => {
  const currentAngle = selectLineBrushAngle(getState())
  const nextAngle = {
    [LineAngles.Free]: LineAngles.Snap,
    [LineAngles.Snap]: LineAngles.Free,
  }[currentAngle] as LineAngles
  dispatch(slice.actions.lineAngle(nextAngle))
}

export const cycleCircleStyle = (): Thunk => async (dispatch, getState) => {
  const currentStyle = selectCircleBrushStyle(getState())
  const nextStyle = {
    [CircleStyles.Fill]: CircleStyles.Stroke,
    [CircleStyles.Stroke]: CircleStyles.Fill,
  }[currentStyle] as CircleStyles
  dispatch(slice.actions.circleStyle(nextStyle))
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

export const selectClipboardStatus = createSelector(
  [selectClipboard],
  (clipboard): ToolStatuses => clipboard.status
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

export const selectBrushStatus = createSelector(
  [selectBrush],
  (brush): ToolStatuses => brush.status
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
  (brushes, mode, palette): PaletteColor =>
    palette[brushes[BrushModes.Pencil].color]
)

export const selectBrushSize = createSelector(
  [selectBrushes, selectActiveBrushMode],
  (brushes, mode): BrushSizes => brushes[BrushModes.Pencil].size
)

export const selectLineBrushAngle = createSelector(
  [selectLineBrush],
  (line): LineAngles => line.angle
)

export const selectCircleBrushStyle = createSelector(
  [selectCircleBrush],
  (circle): CircleStyles => circle.style
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
