import React from "react"
import { View } from "react-native"

import styles from "@itsy.studio/studio/components/center/center.module.scss"

export function Center({ children }) {
  return <View style={styles.center}>{children}</View>
}

export default Center
