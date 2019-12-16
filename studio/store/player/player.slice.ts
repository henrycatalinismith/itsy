import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import delay from "delay"
import { Thunk } from "@itsy.studio/studio/store"
import worker from "@itsy.studio/studio/store/worker"

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
}

const extraReducers = {
  [worker.actions.build]: (player) => {
    player.waiting = true
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
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
