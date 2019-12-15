import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "../"
import worker from "../worker"

export interface PlayerState {
  html: string
  running: boolean
  waiting: boolean
}

const name = "player"

const initialState: PlayerState = {
  html: "",
  running: false,
  waiting: false,
}

const reducers = {
  play(player, action: PayloadAction<string>) {
    player.html = action.payload
    player.running = true
    player.waiting = false
  },

  stop(player) {
    player.running = false
  }
}

const extraReducers = {
  [worker.actions.build]: (player) => {
    player.waiting = true
  }
}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const actions = slice.actions

export const stop = (): Thunk => async dispatch => {
  dispatch(slice.actions.stop())
}

export const playerSelector = ({ player }): PlayerState => player

export const playerRunning = createSelector(playerSelector, ({ running }) => running)

export default slice
