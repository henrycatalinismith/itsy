import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import {
  DevtoolsPanelId,
  DevtoolsState,
  selectDevtools,
  togglePanel,
} from "@itsy.studio/studio/store/devtools"

import DevtoolsCodePanel from "@itsy.studio/studio/components/devtools-code-panel"
import DevtoolsHelpPanel from "@itsy.studio/studio/components/devtools-help-panel"
import DevtoolsPlayPanel from "@itsy.studio/studio/components/devtools-play-panel"
import styles from "./devtools-panels.module.scss"
import { selectDevtoolsPanel } from "../../store/devtools/devtools.slice"

interface DevtoolsPanelsProps {
  panel: DevtoolsPanelId
}

const mapStateToProps = (state) => ({
  panel: selectDevtoolsPanel(state),
})

const mapDispatchToProps = {}

export function DevtoolsPanels({ panel }: DevtoolsPanelsProps) {
  return (
    <View style={styles.devtoolsPanels}>
      {panel === DevtoolsPanelId.code && <DevtoolsCodePanel />}
      {panel === DevtoolsPanelId.play && <DevtoolsPlayPanel />}
      {panel === DevtoolsPanelId.help && <DevtoolsHelpPanel />}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPanels)
