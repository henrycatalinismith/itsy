import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"

export interface PlayerState {
  html: string
  running: boolean
  stopping: boolean
  waiting: boolean
}

const name = "player"

const initialState: PlayerState = {
  html: "",
  running: false,
  stopping: false,
  waiting: false,
}

const reducers = {
  play(player, action: PayloadAction<string>) {
    player.html = action.payload
    player.running = true
    player.waiting = false
  },

  shutdown(player) {
    player.running = false
    player.stopping = true
  },

  stop(player) {
    player.stopping = false
    player.running = false
  },

  wait(player) {
    player.waiting = true
    player.running = false
    player.stopping = false
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const actions = slice.actions

export const stop = (): Thunk => async (dispatch) => {
  dispatch(slice.actions.shutdown())
  await delay(400)
  dispatch(slice.actions.stop())
}

export const playerSelector = ({ player }): PlayerState => player

export const playerRunning = createSelector(
  playerSelector,
  ({ running }) => running
)

export default slice
