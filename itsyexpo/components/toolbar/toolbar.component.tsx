import Button from "@highvalley.systems/itsyexpo/components/button"
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
  label: any
  action: Function
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
      {buttons.map((button, i) => {
        return (
          <View style={styles.button}>
            <Button key={i} onPress={button.action}>
              {button.label}
            </Button>
          </View>
        )
      })}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
