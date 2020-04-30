import Button, {
  ButtonProps,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { Text, TextProps, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect-button-group.module.scss"

interface Button {
  action: any
  label: string
  text: string
  theme: ButtonThemes
}

export interface DiskPanelModeInspectButtonGroupProps {
  buttons: Button[]
  title: string
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeInspectButtonGroup({
  buttons,
  title,
}: DiskPanelModeInspectButtonGroupProps) {
  return (
    <View style={styles.component}>
      <View style={styles.title}>
        <Font fontSize={24}>{title}</Font>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => {
          const buttonProps = {
            action: button.action,
            theme: button.theme,
          }

          const textProps: TextProps = {
            ellipsizeMode: "tail",
            numberOfLines: 1,
            style: styles.text,
          }

          return (
            <View key={button.label} style={styles.button}>
              <Button {...buttonProps}>{button.label}</Button>
              <Text {...textProps}>{button.text}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspectButtonGroup)
