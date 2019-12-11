import React from "react"
import { SafeAreaView, View } from "react-native"

import styles from "./frame.module.scss"

export function Frame({
  children = undefined,
  shallow = false,
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.frame1}>
        {shallow ? children : (
          <View style={styles.frame2}>
            {children}
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}


export default Frame
