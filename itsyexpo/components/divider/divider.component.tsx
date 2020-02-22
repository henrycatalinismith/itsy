import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import { selectScreenOrientation } from "@highvalley.systems/itsyexpo/store/screen"
import styles from "@highvalley.systems/itsyexpo/components/divider/divider.module.scss"

interface DividerProps {
  orientation: string
}

const mapStateToProps = (state) => ({
  orientation: selectScreenOrientation(state),
})

export function Divider({ orientation }: DividerProps) {
  return <View style={[styles.divider, styles[orientation]]} />
}

export default connect(mapStateToProps)(Divider)
