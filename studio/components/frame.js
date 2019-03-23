import React from "react"
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"

import colors from "../constants/colors"

export default ({ children }) => (
  <>
    {(Platform.OS === "ios") && (
      <>
        <StatusBar
          backgroundColor={colors[2]}
          barStyle="light-content"
        />
        <View style={styles.statusBar} />
      </>
    )}
    <View style={styles.container}>
      {children}
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[14],
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
  statusBar: {
    height: 24,
    backgroundColor: colors[1],
  },
})
