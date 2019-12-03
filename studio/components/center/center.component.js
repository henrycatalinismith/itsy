import React from "react"
import { View } from "react-native"

const style = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const Center = ({ children }) => <View style={style}>{children}</View>

export default Center
