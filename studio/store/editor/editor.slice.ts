import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import delay from "delay"
import _ from "lodash"

import { Thunk } from "@itsy.studio/studio/store"
import player from "@itsy.studio/studio/store/player"
import { build, workerOutput } from "@itsy.studio/studio/store/worker"

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
  await delay(400);
  const output = workerOutput(getState())
  dispatch(player.actions.play(output))
}

export const editorSelector = ({ editor }) => editor

export default slice
