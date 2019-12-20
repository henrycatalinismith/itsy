import React from "react"
import { connect } from "react-redux"
import { Controlled as CodeMirror } from "react-codemirror2"

import "./codemirror.scss"
import styles from "./editor.module.scss"
import { moveCursor, cursorSelector } from "@itsy.studio/editor/store/cursor"
import {
  updateSelection,
  selectionSelector,
  SelectionPoint,
} from "@itsy.studio/editor/store/selection"
import { changeText, textSelector } from "@itsy.studio/editor/store/text"

interface EditorProps {
  changeText: (text: string) => void
  moveCursor: (x: number, y: number) => void
  updateSelection: (
    start: SelectionPoint,
    end: SelectionPoint,
    text: string
  ) => void
  text: string
}

const mapStateToProps = (state) => ({
  text: textSelector(state),
})

const mapDispatchToProps = {
  changeText,
  moveCursor,
  updateSelection,
}

export function Editor({
  changeText,
  moveCursor,
  text,
  updateSelection,
}: EditorProps) {
  const codemirror = React.useRef<CodeMirror.Editor>()

  const editorDidMount = React.useCallback((c) => {
    codemirror.current = c
  }, [])

  const onBeforeChange = React.useCallback((...[, , value]) => {
    changeText(value)
  }, [])

  const onCursor = React.useCallback(() => {
    const { line, ch } = codemirror.current.getCursor()
    moveCursor(ch, line)
  }, [])

  const onSelection = React.useCallback(
    (cm, { ranges: [{ anchor, head }] }) => {
      setTimeout(() => {
        const selectedText = codemirror.current.getSelection()
        const start = { x: head.ch, y: head.line }
        const end = { x: anchor.ch, y: anchor.line }
        updateSelection(start, end, selectedText)
      }, 10)
    },
    []
  )

  const options = {
    autocapitalize: false,
    autocorrect: false,
    cursorBlinkRate: 500,
    indentUnit: 1,
    indentWithTabs: false,
    lineNumbers: true,
    mode: "lua",
    onCursor,
    spellcheck: false,
    tabSize: 1,
    theme: "itsy",
  }

  const props = {
    className: styles.editor,
    value: text,
    editorDidMount,
    onBeforeChange,
    onCursor,
    onSelection,
    options,
  }

  return <CodeMirror {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
