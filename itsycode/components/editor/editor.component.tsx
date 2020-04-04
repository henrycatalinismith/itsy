import { moveCursor } from "@highvalley.systems/itsycode/store/cursor"
import { updateSelection } from "@highvalley.systems/itsycode/store/selection"
import { changeText, selectText } from "@highvalley.systems/itsycode/store/text"
import { Point } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import { connect } from "react-redux"
import "./codemirror.scss"
import styles from "./editor.module.scss"

interface EditorProps {
  changeText: (text: string) => void
  moveCursor: (point: Point) => void
  updateSelection: (start: Point, end: Point, text: string) => void
  text: string
}

const mapStateToProps = (state) => ({
  text: selectText(state),
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
    const point: Point = {
      x: ch,
      y: line,
    }
    moveCursor(point)
  }, [])

  const onSelection = React.useCallback(
    (cm, { ranges: [{ anchor, head }] }) => {
      setTimeout(() => {
        const selectedText = codemirror.current.getSelection()
        const start: Point = { x: head.ch, y: head.line }
        const end: Point = { x: anchor.ch, y: anchor.line }
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
    className: styles.component,
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
