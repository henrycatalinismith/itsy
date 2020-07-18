import Font from "@highvalley.systems/itsyexpo/components/font"
import colors from "@highvalley.systems/palettes/fantasy8"
import React from "react"
import { Animated, Easing, View } from "react-native"
import { Path, Svg } from "react-native-svg"
import styles from "./webview-loader.module.scss"

interface WebviewLoaderProps {
  style?: any
}

export function WebviewLoader({ style }: WebviewLoaderProps) {
  const angle = React.useRef(new Animated.Value(0)).current

  const spin = () => {
    angle.setValue(0)
    Animated.timing(angle, {
      toValue: 1,
      duration: Math.pow(2, 11),
      easing: Easing.elastic(0.1),
      useNativeDriver: true,
    }).start(spin)
  }

  React.useEffect(() => {
    spin()
  }, [])

  const rotation = angle.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const d = [
    "M1,1",
    "L13,1",
    "L13,3",
    "L15,3",
    "L15,15",
    "L1,15",
    "L1,1",
    "L13,1",
  ].join(" ")

  return (
    <View style={[styles.component, style]}>
      <Font
        fontSize={32}
        color={colors[7]}
        borderColor={colors[1]}
        borderMultiplier={3}
        strokeMultiplier={0.9}
      >
        {"loading"}
      </Font>

      <Animated.View
        style={{ ...styles.disk, transform: [{ rotate: rotation }] }}
      >
        <Svg width={64} height={64} viewBox="0 0 16 16">
          <Path
            d={d}
            stroke={colors[0]}
            strokeWidth={1}
            fill={colors[12]}
            origin={[8, 8]}
          />
        </Svg>
      </Animated.View>
    </View>
  )
}

export default WebviewLoader
