import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { Thunk } from "@itsy.studio/graphics/store";
import pico8 from "@itsy.studio/palettes/pico8/original.es6";

export type PaletteIndex =
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
  | 15;

export interface PaletteColor {
  hex: string;
}

export type PaletteState = {
  [i in PaletteIndex]: PaletteColor;
};

const name = "palette";

const initialState: PaletteState = {
  0: { hex: pico8[0] },
  1: { hex: pico8[1] },
  2: { hex: pico8[2] },
  3: { hex: pico8[3] },
  4: { hex: pico8[4] },
  5: { hex: pico8[5] },
  6: { hex: pico8[6] },
  7: { hex: pico8[7] },
  8: { hex: pico8[8] },
  9: { hex: pico8[9] },
  10: { hex: pico8[10] },
  11: { hex: pico8[11] },
  12: { hex: pico8[12] },
  13: { hex: pico8[13] },
  14: { hex: pico8[14] },
  15: { hex: pico8[15] }
};

const reducers = {};

const slice = createSlice({
  name,
  initialState,
  reducers
});

export const somethingPalette = (): Thunk => async (dispatch, getState) => {};

export const selectPalette = ({ palette }) => palette;

export default slice;
