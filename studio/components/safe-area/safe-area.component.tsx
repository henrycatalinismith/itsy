import React from "react"
import { connect } from "react-redux"
import {
  SafeAreaView,
  StyleSheet,
  View,
  LayoutChangeEvent,
  LayoutRectangle,
} from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { EdgeInsets } from "react-native-safe-area-context"

import { updateSafeArea } from "@itsy.studio/studio/store/safe-area"
import styles from "@itsy.studio/studio/components/safe-area/safe-area.module.scss"

interface SafeAreaProps {
  children: any
  updateSafeArea: (layout: LayoutRectangle) => void
}

const mapStateToProps = (state) => ({
  //height: selectScreenHeightMinusKeyboardHeight(state),
})

const mapDispatchToProps = {
  updateSafeArea,
}

export function SafeArea({
  children = undefined,
  updateSafeArea,
}: SafeAreaProps) {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
  })

  const onLayout = (event: LayoutChangeEvent) => {
    updateSafeArea(event.nativeEvent.layout)
  }

  return (
    <SafeAreaView style={{ ...styles.safeArea }} onLayout={onLayout}>
      {children}
    </SafeAreaView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SafeArea)
