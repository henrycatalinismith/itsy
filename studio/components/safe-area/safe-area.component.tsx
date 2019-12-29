import React from "react"
import { connect } from "react-redux"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { EdgeInsets } from "react-native-safe-area-context"

import { updateSafeArea } from "@itsy.studio/studio/store/safe-area"
import styles from "@itsy.studio/studio/components/safe-area/safe-area.module.scss"

interface SafeAreaProps {
  children: any
  updateSafeArea: (insets: EdgeInsets) => void
  //shallow: boolean
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
  const insets = useSafeArea()
  React.useEffect(() => {
    updateSafeArea(insets)
  }, [insets.top, insets.right, insets.bottom, insets.left])

  const styles = StyleSheet.create({
    safeArea: {
      position: "absolute",
      top: 0,
      right: insets.right,
      bottom: insets.bottom,
      left: insets.left,
    },
  })

  return <View style={{ ...styles.safeArea }}>{children}</View>
}

export default connect(mapStateToProps, mapDispatchToProps)(SafeArea)
