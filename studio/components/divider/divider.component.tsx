import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import { screenOrientation } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/divider/divider.module.scss"

interface DividerProps {
  orientation: string
}

const mapStateToProps = (state) => ({
  orientation: screenOrientation(state),
})

export function Divider({ orientation }: DividerProps) {
  return <View style={[styles.divider, styles[orientation]]} />
}

export default connect(mapStateToProps)(Divider)