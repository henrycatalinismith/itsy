import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  Panel,
  PanelIds,
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
  const bg = panel.active ? colors[0] : colors[0]
  const fg = panel.active ? "#28DEFF" : colors[7]
  const fontSize = panel.active ? 18 : 16

  const font = {
    bg,
    fg,
    fontSize,
  }

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
