import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Thunk } from "@itsy.studio/graphics/store"
import { PaletteIndex } from "@itsy.studio/graphics/store/palette"

export type SpritesheetPixelIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63

export type SpritesheetState = {
  [i in SpritesheetPixelIndex]: {
    [i in SpritesheetPixelIndex]: PaletteIndex
  }
}

const name = "spritesheet"

const initialState: SpritesheetState = _.zipObject(
  _.range(64),
  _.range(64).map(() => _.zipObject(_.range(64), _.fill(Array(64), 0)))
)

console.log(initialState)

const reducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const somethingSpritesheet = (): Thunk => async (
  dispatch,
  getState
) => {}

export const selectSpritesheet = ({ spritesheet }) => spritesheet

export default slice
