import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import styles from "./console.module.scss"

interface ConsoleProps {
  text: string
}

const mapStateToProps = (state) => ({
  // player: playerSelector(state),
})

const mapDispatchToProps = {}

export function Console({ text }: ConsoleProps) {
  return (
    <View style={styles.console}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
