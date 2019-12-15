import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Thunk } from "../"
import { write } from "@itsy.studio/itsy"

import { activeDisk } from "../disks"

export interface WorkerState {
  running: boolean
  success: boolean
  output: string
}

const name = "worker"

const initialState: WorkerState = {
  running: false,
  success: false,
  output: "",
}

const reducers = {
  build(worker) {
    worker.running = true
  },

  success(worker, action: PayloadAction<string>) {
    worker.output = action.payload
    worker.running = false
    worker.success = true
  }
}

export const workerSelector = ({ worker }): WorkerState => worker

export const workerOutput = createSelector(workerSelector, ({ output }) => output)
export const workerRunning = createSelector(workerSelector, ({ running }) => running)
export const workerSuccess = createSelector(workerSelector, ({ success }) => success)

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const build = (): Thunk => async (dispatch, getState) => {
  console.log("build")
  const state = getState()
  dispatch(slice.actions.build())

  const disk = activeDisk(state)
  const output = write(disk)

  dispatch(slice.actions.success(output))
}

export const actions = slice.actions

export default slice
