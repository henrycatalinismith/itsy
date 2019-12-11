import React from "react"
import { TouchableOpacity } from "react-native"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import Font from "../font"
import styles from "./button.module.scss"

const fontThemes: { [theme: string]: Object } = {
  blue: {
    color: colors[7],
    borderColor: colors[1],
  },
  gray: {
    color: colors[7],
    borderColor: colors[1],
  },
  red: {
    color: colors[7],
    borderColor: colors[1],
  },
}

export function Button({
  children = undefined,
  onPress = () => {},
  theme = "gray",
}) {
  const font = {
    fontSize: 16,
    strokeMultiplier: 0.9,
    borderMultiplier: 3,
    ...fontThemes[theme],
  }

  return (
    <TouchableOpacity style={[styles.button, styles[theme]]} onPress={onPress}>
      <Font {...font}>{children}</Font>
    </TouchableOpacity>
  )
}

export default Button
