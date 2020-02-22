import React from "react"
import { TouchableOpacity } from "react-native"
import { connect } from "react-redux"

import {
  Panel as _Panel,
  selectPanels,
  togglePanel,
} from "@itsy.studio/studio/store/panels"

import colors from "@highvalley.systems/palettes/pico8/original.es6"
import Font from "@itsy.studio/studio/components/font"
import styles from "./tab.module.scss"

interface TabProps {
  id: string
  panel: _Panel
  togglePanel: (id: PanelId) => void
}

const mapStateToProps = (state, { id }) => ({
  panel: selectPanels(state)[id],
})

const mapDispatchToProps = {
  togglePanel,
}

export function Tab({ panel, togglePanel }: TabProps) {
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
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Font {...font}>{panel.id}</Font>
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)
