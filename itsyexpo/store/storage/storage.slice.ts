import _ from "lodash"
import uuid from "uuid"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AsyncStorage } from "react-native"
import { Thunk } from "@highvalley.systems/itsyexpo/store"

export interface StorageDelete {
  id: string
  key: string
}

export interface StorageRead {
  id: string
  key: string
}

export interface StorageWrite {
  id: string
  key: string
  value: any
}

export interface StorageState {
  deletes: {
    [id: string]: StorageDelete
  }
  reads: {
    [id: string]: StorageRead
  }
  writes: {
    [id: string]: StorageWrite
  }
}

const name = "storage"

const initialState: StorageState = {
  deletes: {},
  reads: {},
  writes: {},
}

const reducers = {
  deleteAttempt(storage, action: PayloadAction<StorageDelete>) {
    storage.deletes[action.payload.id] = {
      id: action.payload.id,
      key: action.payload.key,
    }
  },

  deleteSuccess(storage, action: PayloadAction<string>) {
    delete storage.deletes[action.payload]
  },

  readAttempt(storage, action: PayloadAction<StorageRead>) {
    storage.reads[action.payload.id] = {
      id: action.payload.id,
      key: action.payload.key,
    }
  },

  readSuccess(storage, action: PayloadAction<string>) {
    delete storage.reads[action.payload]
  },

  writeAttempt(storage, action: PayloadAction<StorageWrite>) {
    storage.writes[action.payload.id] = {
      id: action.payload.id,
      key: action.payload.key,
      value: action.payload.value,
    }
  },

  writeSuccess(storage, action: PayloadAction<string>) {
    delete storage.writes[action.payload]
  },
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const deleteValue = (key: string): Thunk => async (dispatch) => {
  const id = uuid()
  dispatch(slice.actions.deleteAttempt({ id, key }))
  await AsyncStorage.removeItem(key)
  dispatch(slice.actions.deleteSuccess(id))
}

export const readValues = (key: RegExp): Thunk => async (dispatch) => {
  const id = uuid()
  dispatch(slice.actions.readAttempt({ id, key: key.toString() }))

  const keys = await AsyncStorage.getAllKeys()
  const matches = keys.filter((k) => k.match(key))
  const values = await AsyncStorage.multiGet(matches)

  dispatch(slice.actions.readSuccess(id))
  return values
}

export const writeValue = (key: string, value: any): Thunk => async (
  dispatch,
  getState
) => {
  const id = uuid()
  dispatch(slice.actions.writeAttempt({ id, key, value }))
  await AsyncStorage.setItem(key, JSON.stringify(value))
  dispatch(slice.actions.writeSuccess(id))
}

export const selectStorage = ({ storage }): StorageState => storage

export const selectStorageReads = ({ storage }): StorageRead[] => storage.reads

export const selectStorageWrites = ({ storage }): StorageWrite[] =>
  storage.writes

export const selectStorageBusy = createSelector(
  selectStorageReads,
  selectStorageWrites,
  (reads, writes) => !(_.isEmpty(reads) && _.isEmpty(writes))
)

export default slice
