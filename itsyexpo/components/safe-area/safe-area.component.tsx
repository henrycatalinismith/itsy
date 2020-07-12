import _ from "lodash"
import React from "react"
import { LayoutChangeEvent, LayoutRectangle, SafeAreaView } from "react-native"
import { connect } from "react-redux"
import styles from "./safe-area.module.scss"

interface SafeAreaProps {
  children: any
}

const mapStateToProps = (state) => ({
  //height: selectScreenHeightMinusKeyboardHeight(state),
})

const mapDispatchToProps = {}

export function SafeArea({ children = undefined }: SafeAreaProps) {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
}

export default connect(mapStateToProps, mapDispatchToProps)(SafeArea)
