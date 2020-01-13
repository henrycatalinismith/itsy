import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel.module.scss"

interface PanelProps {
  children: any
  width: number
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export function Panel({ children, width }: PanelProps) {
  return (
    <View style={[styles.outer, { width }]}>
      <View style={[styles.inner, { width: width - 8 }]}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
