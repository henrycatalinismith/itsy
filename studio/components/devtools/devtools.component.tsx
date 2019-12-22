import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import DevtoolsPlayTab from "@itsy.studio/studio/components/devtools-play-tab"
import styles from "@itsy.studio/studio/components/devtools/devtools.module.scss"

interface DevtoolsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Devtools({}: DevtoolsProps) {
  return (
    <View style={styles.devtools}>
      <DevtoolsPlayTab />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Devtools)
