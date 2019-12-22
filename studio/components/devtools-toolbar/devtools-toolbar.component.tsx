import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"
import DevtoolsPlayTab from "@itsy.studio/studio/components/devtools-play-tab"
import styles from "@itsy.studio/studio/components/devtools-toolbar/devtools-toolbar.module.scss"

interface DevtoolsToolbarProps {
  devtools: DevtoolsState
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {}

export function DevtoolsToolbar({ devtools }: DevtoolsToolbarProps) {
  return (
    <View style={styles.devtoolsToolbar}>
      <DevtoolsPlayTab />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsToolbar)
