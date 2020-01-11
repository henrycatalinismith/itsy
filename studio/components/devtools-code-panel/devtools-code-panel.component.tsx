import React from "react"
import { connect } from "react-redux"
import DevtoolsPanel from "@itsy.studio/studio/components/devtools-panel"
import Editor from "@itsy.studio/studio/components/editor"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/devtools-code-panel/devtools-code-panel.module.scss"

interface DevtoolsCodePanelProps {
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function DevtoolsCodePanel({ screen }: DevtoolsCodePanelProps) {
  return (
    <DevtoolsPanel width={screen.width}>
      <Editor />
    </DevtoolsPanel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsCodePanel)
