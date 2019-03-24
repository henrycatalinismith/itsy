import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import Disk from "../components/disk"
import Floppy from "../components/floppy"
import Font from "../components/font"
import Header from "../components/header"
import colors from "../constants/colors"

export default () => {
  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text>lol</Text>
        <Disk />
        <Font borderColor={1}>abcdefghijklm</Font>
        <Font
          fontSize={16}
          color={colors[10]}
          borderColor={colors[0]}
          borderMultiplier={1.5}
        >ALPHA!</Font>

        <Font
          fontSize={32}
          color={colors[8]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Universal</Font>

        <Font
          fontSize={32}
          color={colors[12]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Fantasy</Font>

        <Font
          fontSize={32}
          color={colors[11]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Console</Font>

        <Font
          fontSize={24}
          color={colors[6]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >something</Font>

        <Floppy size={256} />

      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
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
