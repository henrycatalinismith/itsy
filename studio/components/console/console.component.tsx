import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./console.module.scss"

interface ConsoleProps {
  // player: PlayerState
}

const mapStateToProps = (state) => ({
  // player: playerSelector(state),
})

const mapDispatchToProps = {}

export function Console({}: ConsoleProps) {
  return <View style={styles.console}></View>
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
