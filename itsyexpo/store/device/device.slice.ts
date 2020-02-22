import { createSelector, createSlice } from "@reduxjs/toolkit"

export interface DeviceState {
  brand: string
  manufacturer: string
  modelName: string
  osName: string
  osVersion: string
}

const name = "device"

const initialState: DeviceState = {
  brand: "",
  manufacturer: "",
  modelName: "",
  osName: "",
  osVersion: "",
}

const reducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const selectDevice = ({ device }): DeviceState => device

export default slice
