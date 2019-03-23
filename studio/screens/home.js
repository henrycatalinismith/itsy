import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import Header from "../components/header"
import colors from "../constants/colors"

export default () => {
  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text>lol</Text>
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
