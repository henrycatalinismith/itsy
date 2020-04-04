import { createSlice } from "@reduxjs/toolkit"

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
