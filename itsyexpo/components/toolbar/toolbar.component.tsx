import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./toolbar.module.scss"

export enum ToolbarThemes {
  DiskPanelBrowser = "DiskPanelBrowser",
  DiskPanelInspector = "DiskPanelInspector",
  PlayPanelConsole = "PlayPanelConsole",
}

export interface ToolbarButton {
  action: Function
  label: any
  theme: ButtonThemes
}

export interface ToolbarProps {
  buttons: ToolbarButton[]
  theme: ToolbarThemes
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function Toolbar({ buttons, theme }: ToolbarProps) {
  return (
    <View style={[styles.component, styles[theme]]}>
      {buttons.map((button) => {
        return (
          <View key={button.label} style={styles.button}>
            <Button onPress={button.action} theme={button.theme}>
              {button.label}
            </Button>
          </View>
        )
      })}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
