import React from "react"
import { connect } from "react-redux"
import { SafeAreaView, View } from "react-native"

import { selectScreenHeightMinusKeyboardHeight } from "@itsy.studio/studio/store/screen"
import styles from "@itsy.studio/studio/components/frame/frame.module.scss"

interface FrameProps {
  children: any
  height: number
  shallow: boolean
}

const mapStateToProps = (state) => ({
  height: selectScreenHeightMinusKeyboardHeight(state),
})

const mapDispatchToProps = {}

export function Frame({
  children = undefined,
  height,
  shallow = false,
}: FrameProps) {
  return (
    <SafeAreaView style={{ ...styles.screen, height: height - 48 }}>
      <View style={styles.frame1}>
        {shallow ? children : <View style={styles.frame2}>{children}</View>}
      </View>
    </SafeAreaView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)
