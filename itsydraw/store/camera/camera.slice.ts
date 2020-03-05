import { Thunk } from "@highvalley.systems/itsydraw/store"
import {
  Point,
  Rect,
  SpritesheetPixelIndex,
} from "@highvalley.systems/typedefs/itsy"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

const name = "camera"

const initialState: Rect = {
  x: 16,
  y: 0,
  width: 64,
  height: 64,
}

const reducers = {
  move(camera, action: PayloadAction<Point>): void {
    const { x, y } = action.payload
    // const zoom = selectZoom({ camera })

    camera.x = x - camera.width / 2
    camera.y = y - camera.height / 2

    if (camera.x < 0) {
      camera.x = 0
    }

    if (camera.y < 0) {
      camera.y = 0
    }
  },

  zoom(camera, action: PayloadAction<number>): void {
    camera.width = 128 / action.payload
    camera.height = 128 / action.payload
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const moveCamera = (x: number, y: number): Thunk => async (
  dispatch,
  getState
) => {
  const zoom = selectZoom(getState())
  const point = { x, y }

  dispatch(slice.actions.move(point))
}

export const zoomCamera = (z: number): Thunk => async (dispatch, getState) => {
  const zoom = selectZoom(getState())
  if (zoom === z || Math.log2(z) % 1 !== 0) {
    return
  }

  dispatch(slice.actions.zoom(z))
}

export const selectCamera = ({ camera }) => camera

export const selectZoom = createSelector(
  [selectCamera],
  (camera) => 128 / camera.width
)

export default slice
