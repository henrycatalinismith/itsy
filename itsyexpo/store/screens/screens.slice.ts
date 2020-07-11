import delay from "delay"
import { Thunk } from "@highvalley.systems/itsyexpo/store"
import { selectDevice } from "@highvalley.systems/itsyexpo/store/device"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

export enum ScreenIds {
  Code = "Code",
  Disk = "Disk",
  Draw = "Draw",
  Home = "Home",
  Meta = "Meta",
  Play = "Play",
}

export interface Screen {
  id: ScreenIds
}

export interface CodeScreenState extends Screen {
  id: ScreenIds.Code
}

export interface DiskScreenState extends Screen {
  id: ScreenIds.Disk
}

export interface DrawScreenState extends Screen {
  id: ScreenIds.Draw
}

export enum HomeScreenModes {
  List = "List",
  Create = "Create",
  Import = "Import",
  Starter = "Starter",
}

export interface HomeScreenState extends Screen {
  id: ScreenIds.Home
  mode: HomeScreenModes
}

export interface MetaScreenState extends Screen {
  id: ScreenIds.Meta
}

export interface PlayScreenState extends Screen {
  id: ScreenIds.Play
}

export interface ScreensState {
  [ScreenIds.Code]: CodeScreenState
  [ScreenIds.Disk]: DiskScreenState
  [ScreenIds.Draw]: DrawScreenState
  [ScreenIds.Home]: HomeScreenState
  [ScreenIds.Meta]: MetaScreenState
  [ScreenIds.Play]: PlayScreenState
}

const name = "screens"

const initialState: ScreensState = {
  [ScreenIds.Code]: {
    id: ScreenIds.Code,
  },

  [ScreenIds.Disk]: {
    id: ScreenIds.Disk,
  },

  [ScreenIds.Draw]: {
    id: ScreenIds.Draw,
  },

  [ScreenIds.Home]: {
    id: ScreenIds.Home,
    mode: HomeScreenModes.List,
  },

  [ScreenIds.Meta]: {
    id: ScreenIds.Meta,
  },

  [ScreenIds.Play]: {
    id: ScreenIds.Play,
  },
}

const reducers = {
  homeScreenMode(screens, action: PayloadAction<HomeScreenModes>): void {
    screens[ScreenIds.Home].mode = action.payload
  },
}

const extraReducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
})

export const focusScreen = (id: ScreenIds): Thunk => async (
  dispatch,
  getState
) => {
  console.log(id)
}

export const setHomeScreenMode = (mode: HomeScreenModes): Thunk => async (
  dispatch,
  getState
) => {
  dispatch(slice.actions.homeScreenMode(mode))
}

export const selectScreens = ({ screens }): ScreensState => screens

export const selectCodeScreen = createSelector(
  [selectScreens],
  (screens): CodeScreenState => screens.Code as CodeScreenState
)

export const selectDiskScreen = createSelector(
  [selectScreens],
  (screens): DiskScreenState => screens.Disk as DiskScreenState
)

export const selectDrawScreen = createSelector(
  [selectScreens],
  (screens): DrawScreenState => screens.Draw as DrawScreenState
)

export const selectHomeScreen = createSelector(
  [selectScreens],
  (screens): HomeScreenState => screens.Home as HomeScreenState
)

export const selectMetaScreen = createSelector(
  [selectScreens],
  (screens): MetaScreenState => screens.Meta as MetaScreenState
)

export const selectPlayScreen = createSelector(
  [selectScreens],
  (screens): PlayScreenState => screens.Play as PlayScreenState
)

export default slice
