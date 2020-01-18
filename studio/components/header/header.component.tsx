import React from "react"
import { SafeAreaView, StatusBar, View } from "react-native"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import Floppy from "@itsy.studio/studio/components/floppy"
import Font from "@itsy.studio/studio/components/font"
import styles from "@itsy.studio/studio/components/header/header.module.scss"

export function Header({ disk, navigation }) {
  const activeIndex = navigation.state.index
  const activeRoute = navigation.state.routes[activeIndex]
  const activeScreen = activeRoute.routeName

  const title = {
    Home: () => "itsy studio..",
    Disk: () => "itsy studio",
    Code: () => "itsy studio",
    Help: () => "itsy studio",
  }[activeScreen]()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors[2]} barStyle="light-content" />

      <View style={styles.inside}>
        <View style={styles.left}>
          <Floppy size={18} />

          <View style={styles.title}>
            <Font
              fontSize={15}
              color={colors[7]}
              borderColor={colors[0]}
              borderMultiplier={3}
              strokeMultiplier={0.9}
            >
              {title}
            </Font>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
