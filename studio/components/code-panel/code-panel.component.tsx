import React from "react"
import { connect } from "react-redux"
import Editor from "@itsy.studio/studio/components/editor"
import Panel from "@itsy.studio/studio/components/panel"
import styles from "./code-panel.module.scss"

interface CodePanelProps {
  // screen: ScreenState
}

const mapStateToProps = (state) => ({
  // screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function CodePanel({}: CodePanelProps) {
  return (
    <Panel id="code">
      <Editor />
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel)
