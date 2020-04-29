import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Panel,
  PanelIds,
  PanelAvailabilities,
  PanelVisibilities,
  selectPanels,
  togglePanel,
} from "@highvalley.systems/itsyexpo/store/panels"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import React from "react"
import { TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-picker-button.module.scss"

interface PanelPickerButtonProps {
  id: string
  panel: Panel
  togglePanel: (id: PanelIds) => void
}

const mapStateToProps = (state, { id }) => ({
  panel: selectPanels(state)[id],
})

const mapDispatchToProps = {
  togglePanel,
}

export function PanelPickerButton({
  panel,
  togglePanel,
}: PanelPickerButtonProps) {
  const font = (() => {
    switch (true) {
      case panel.visibility === PanelVisibilities.Visible:
        return {
          bg: colors[0],
          fg: "#28DEFF",
          fontSize: 18,
        }

      case panel.availability === PanelAvailabilities.Available:
        return {
          bg: colors[0],
          fg: colors[7],
          fontSize: 16,
        }

      default:
        return {
          bg: colors[0],
          fg: colors[14],
          fontSize: 16,
        }
    }
  })()

  const onPress = React.useCallback(() => {
    togglePanel(panel.id)
  }, [])

  return (
    <TouchableOpacity style={styles.component} onPress={onPress}>
      <Font {...font}>{panel.id}</Font>
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPickerButton)
