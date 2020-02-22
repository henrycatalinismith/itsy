import React from "react"
import { connect } from "react-redux"
import { Controlled as CodeMirror } from "react-codemirror2"

import { Point2D } from "@itsy.studio/types"
import "./codemirror.scss"
import styles from "./editor.module.scss"
import {
  moveCursor,
  cursorSelector,
} from "@highvalley.systems/itsyedit/store/cursor"
import { updateSelection } from "@highvalley.systems/itsyedit/store/selection"
import {
  changeText,
  textSelector,
} from "@highvalley.systems/itsyedit/store/text"

interface EditorProps {
  changeText: (text: string) => void
  moveCursor: (point: Point2D) => void
  updateSelection: (start: Point2D, end: Point2D, text: string) => void
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
    const point: Point2D = {
      x: ch,
      y: line,
    }
    moveCursor(point)
  }, [])

  const onSelection = React.useCallback(
    (cm, { ranges: [{ anchor, head }] }) => {
      setTimeout(() => {
        const selectedText = codemirror.current.getSelection()
        const start: Point2D = { x: head.ch, y: head.line }
        const end: Point2D = { x: anchor.ch, y: anchor.line }
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
