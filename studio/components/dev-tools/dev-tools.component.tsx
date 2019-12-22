import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import DevToolsPlayTab from "@itsy.studio/studio/components/dev-tools-play-tab"
import styles from "@itsy.studio/studio/components/dev-tools/dev-tools.module.scss"

interface DevToolsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DevTools({}: DevToolsProps) {
  return (
    <View style={styles.devTools}>
      <DevToolsPlayTab />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevTools)
