import React from "react"
import { SafeAreaView, View } from "react-native"

import styles from "@itsy.studio/studio/components/frame/frame.module.scss"

export function Frame({ children = undefined, shallow = false }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.frame1}>
        {shallow ? children : <View style={styles.frame2}>{children}</View>}
      </View>
    </SafeAreaView>
  )
}

export default Frame
