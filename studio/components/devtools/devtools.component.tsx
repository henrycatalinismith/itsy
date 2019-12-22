import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import {
  DevtoolsState,
  selectDevtools,
} from "@itsy.studio/studio/store/devtools"
import DevtoolsPlayTab from "@itsy.studio/studio/components/devtools-play-tab"
import styles from "@itsy.studio/studio/components/devtools/devtools.module.scss"

interface DevtoolsProps {
  devtools: DevtoolsState
}

const mapStateToProps = (state) => ({
  devtools: selectDevtools(state),
})

const mapDispatchToProps = {}

export function Devtools({ devtools }: DevtoolsProps) {
  return (
    <View style={styles.devtools}>
      <DevtoolsPlayTab />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
