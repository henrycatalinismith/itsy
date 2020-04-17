import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"

export enum PlayerModes {
  Load = "Load",
  Busy = "Busy",
  Halt = "Halt",
  Idle = "Idle",
}

export interface PlayerState {
  html: string
  mode: PlayerModes
}

const name = "player"

const initialState: PlayerState = {
  html: "",
  mode: PlayerModes.Idle,
}

const reducers = {
  load(player) {
    player.mode = PlayerModes.Load
  },

  play(player, action: PayloadAction<string>) {
    player.html = action.payload
    player.mode = PlayerModes.Busy
  },

  halt(player) {
    player.mode = PlayerModes.Halt
  },

  idle(player) {
    player.mode = PlayerModes.Idle
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const actions = slice.actions

export const stop = (): Thunk => async (dispatch) => {
  dispatch(slice.actions.halt())
  await delay(400)
  dispatch(slice.actions.idle())
}

export const selectPlayer = ({ player }): PlayerState => player

export const selectPlayerMode = createSelector(
  selectPlayer,
  (player): PlayerModes => player.mode
)

export default slice
