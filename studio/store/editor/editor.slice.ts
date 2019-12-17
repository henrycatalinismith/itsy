import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"

export interface EditorState {}

const name = "editor"

const initialState: EditorState = {}

const reducers = {}

const slice = createSlice({
  name,
  initialState,
  reducers,
})

export const editorSelector = ({ editor }) => editor

export default slice
