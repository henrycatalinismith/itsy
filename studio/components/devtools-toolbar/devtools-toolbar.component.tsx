import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsPanelId,
  DevtoolsState,
  selectDevtools,
  togglePanel,
} from "@itsy.studio/studio/store/devtools"
import Button from "@itsy.studio/studio/components/button"
import styles from "./devtools-toolbar.module.scss"

interface DevtoolsToolbarProps {
  devtools: DevtoolsState
  togglePanel: (id: DevtoolsPanelId) => void
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {
  togglePanel,
}

export function DevtoolsToolbar({
  devtools,
  togglePanel,
}: DevtoolsToolbarProps) {
  return (
    <View style={styles.devtoolsToolbar}>
      <Button onPress={() => togglePanel(DevtoolsPanelId.code)}>
        {"code"}
      </Button>
      <Button onPress={() => togglePanel(DevtoolsPanelId.play)}>
        {"play"}
      </Button>
      <Button onPress={() => togglePanel(DevtoolsPanelId.help)}>
        {"help"}
      </Button>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsToolbar)
