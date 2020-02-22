import React from "react"
import { connect } from "react-redux"
import Editor from "@highvalley.systems/itsyexpo/components/editor"
import styles from "./code-panel.module.scss"

interface CodePanelProps {
  // screen: ScreenState
}

const mapStateToProps = (state) => ({
  // screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function CodePanel({}: CodePanelProps) {
  return <Editor />
}

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel)
