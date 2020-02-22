import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { SafeAreaView, LayoutChangeEvent, LayoutRectangle } from "react-native"

import { updateSafeArea } from "@highvalley.systems/itsyexpo/store/safe-area"
import styles from "./safe-area.module.scss"

interface SafeAreaProps {
  children: any
  updateSafeArea: (layout: LayoutRectangle) => any
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
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    updateSafeArea(_.clone(event.nativeEvent.layout))
  }, [])

  return (
    <SafeAreaView style={styles.safeArea} onLayout={onLayout}>
      {children}
    </SafeAreaView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SafeArea)
