import React from "react"
import { connect } from "react-redux"
import Editor from "@itsy.studio/studio/components/editor"
import Panel from "@itsy.studio/studio/components/panel"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./code-panel.module.scss"

interface CodePanelProps {
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function CodePanel({ screen }: CodePanelProps) {
  console.log("codepanel")
  return (
    <Panel width={screen.width}>
      <Editor />
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel)
