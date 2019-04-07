import React from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import Font from "../components/font"
import Header from "../components/header"
import colors from "../constants/colors"

export default () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Frame>
        <Header />
        <ScrollView style={styles.container}>

          <Font
            fontSize={64}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >abcdefghijklmnopqrstuvwxyz</Font>

          <Font
            fontSize={64}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >ABCDEFGHIJKLMNOPQRSTUVWXYZ</Font>

          <Font
            fontSize={64}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >0123456789</Font>

          <Font
            fontSize={64}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >!@{'"'}{"'"}{'/'}{'\\'}$%^&*()_+][?}{'}{'}{'#'}</Font>

        </ScrollView>
      </Frame>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors[1],
  },
  container: {
    flex: 1,

    backgroundColor: colors[7],
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },
})


