import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import { selectOutput } from "@itsy.studio/studio/store/output"
import styles from "./console.module.scss"

interface ConsoleProps {
  output: string
}

const mapStateToProps = (state) => ({
  output: selectOutput(state),
})

const mapDispatchToProps = {}

export function Console({ output }: ConsoleProps) {
  return (
    <View style={styles.console}>
      <Text style={styles.text}>{output}</Text>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
