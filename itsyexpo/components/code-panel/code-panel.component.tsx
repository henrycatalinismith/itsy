import CodePanelWebview from "@highvalley.systems/itsyexpo/components/code-panel-webview"
import {
  PanelAvailabilities,
  selectCodePanelAvailability,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./code-panel.module.scss"

interface CodePanelProps {
  codePanelAvailability: PanelAvailabilities
}

const mapStateToProps = (state) => ({
  codePanelAvailability: selectCodePanelAvailability(state),
})

const mapDispatchToProps = {}

export function CodePanel({ codePanelAvailability }: CodePanelProps) {
  return React.useMemo(
    () => (
      <View style={styles.component}>
        {codePanelAvailability === PanelAvailabilities.Available && (
          <CodePanelWebview onLoad={() => {}} />
        )}
      </View>
    ),
    [codePanelAvailability]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CodePanel)
