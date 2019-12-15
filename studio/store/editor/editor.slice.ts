import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import delay from "delay"
import _ from "lodash"

import { Thunk } from "../"
import player from "../player"
import { build, workerOutput } from "../worker"

export interface EditorState {
}

const name = "editor"

const initialState: EditorState = {
}

const reducers = {
}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const play = (): Thunk => async (dispatch, getState) => {
  dispatch(build())
  await delay(1000);
  const output = workerOutput(getState())
  dispatch(player.actions.play(output))
}

export const editorSelector = ({ editor }) => editor

export default slice
