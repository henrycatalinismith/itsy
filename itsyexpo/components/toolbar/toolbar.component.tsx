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

export type ToolbarItem = ToolbarButton | React.ReactElement

export interface ToolbarProps {
  buttons: ToolbarItem[]
  theme: ToolbarThemes
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function Toolbar({ buttons, theme }: ToolbarProps) {
  return (
    <View style={[styles.component, styles[theme]]}>
      {buttons.map((item, i) => {
        if (item.hasOwnProperty("label")) {
          const button = item as ToolbarButton
          return (
            <View key={button.label} style={styles.button}>
              <Button action={button.action} theme={button.theme}>
                {button.label}
              </Button>
            </View>
          )
        }

        if (React.isValidElement(item)) {
          return <React.Fragment key={i}>{item}</React.Fragment>
        }
      })}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
