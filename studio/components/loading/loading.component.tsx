import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import colors from "@itsy.studio/palettes/pico8/original.es6"
import Font from "@itsy.studio/studio/components/font"
import styles from "@itsy.studio/studio/components/loading/loading.module.scss"

interface LoadingProps {}

export function Loading({}: LoadingProps) {
  return (
    <View style={styles.loading}>
      <Font
        fontSize={32}
        color={colors[7]}
        borderColor={colors[1]}
        borderMultiplier={3}
        strokeMultiplier={0.9}
      >
        {"loading"}
      </Font>
    </View>
  )
}

export default Loading
