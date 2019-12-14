import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"

import { allDisks } from "../disks"

interface EditorState {
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

const editorSelector = ({ editor }) => editor

export default slice
