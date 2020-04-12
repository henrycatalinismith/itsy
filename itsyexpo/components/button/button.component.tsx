import Font from "@highvalley.systems/itsyexpo/components/font"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import _ from "lodash"
import React from "react"
import { TouchableOpacity } from "react-native"
import styles from "./button.module.scss"

export enum ButtonThemes {
  Blue = "Blue",
  Gray = "Gray",
  Red = "Red",
  White = "White",
}

const fontThemes: { [theme in ButtonThemes]: Object } = {
  [ButtonThemes.Blue]: {
    color: colors[7],
    borderColor: colors[1],
  },
  [ButtonThemes.Gray]: {
    color: colors[7],
    borderColor: colors[1],
  },
  [ButtonThemes.Red]: {
    color: colors[7],
    borderColor: colors[1],
  },
  [ButtonThemes.White]: {
    color: colors[7],
    borderColor: colors[1],
  },
}

export interface ButtonProps {
  children: any
  onPress: any
  theme?: ButtonThemes
}

export function Button({
  children = undefined,
  onPress = () => {},
  theme = ButtonThemes.Gray,
}: ButtonProps) {
  const font = {
    fontSize: 16,
    strokeMultiplier: 0.9,
    borderMultiplier: 3,
    ...fontThemes[theme],
  }

  return (
    <TouchableOpacity style={[styles.button, styles[theme]]} onPress={onPress}>
      {_.isArray(children) ? (
        <>
          {_.map(_.toArray(children), (c, i) => {
            if (_.isString(c)) {
              return (
                <Font key={i} {...font}>
                  {c}
                </Font>
              )
            } else {
              return <React.Fragment key={i}>{c}</React.Fragment>
            }
          })}
        </>
      ) : _.isString(children) ? (
        <Font {...font}>{children}</Font>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default Button
