import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WorkerState {
  running: boolean
}

const name = "worker"

const initialState: WorkerState = {
  running: false,
}

const reducers = {
  start(worker) {
    worker.running = true
  },

  stop(worker) {
    worker.running = false
  }
}

export const workerSelector = ({ worker }): WorkerState => worker

export const workerRunning = createSelector(workerSelector, ({ running }) => running)

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export default slice
