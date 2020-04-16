import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-create-button-group.module.scss"

interface Button {
  action: any
  label: string
  active: boolean
}

export interface DiskPanelModeCreateButtonGroupProps {
  buttons: Button[]
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeCreateButtonGroup({
  buttons,
}: DiskPanelModeCreateButtonGroupProps) {
  return (
    <View style={styles.component}>
      {buttons.map((button, i) => {
        const touchableOpacity: TouchableOpacityProps = {
          onPress: button.action,
          style: [styles.button],
        }

        if (i === 0) {
          touchableOpacity.style.push(styles.firstButton)
        } else if (i === buttons.length - 1) {
          touchableOpacity.style.push(styles.lastButton)
        }

        if (button.active) {
          touchableOpacity.style.push(styles.activeButton)
        } else if (i === buttons.length - 1) {
          touchableOpacity.style.push(styles.inactiveButton)
        }

        return (
          <TouchableOpacity key={button.label} {...touchableOpacity}>
            <Font fontSize={16}>{button.label}</Font>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeCreateButtonGroup)
