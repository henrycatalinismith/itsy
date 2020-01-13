import React from "react"
import { Animated, LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Rect } from "@itsy.studio/types/geometry"

import {
  PanelId,
  Panel,
  selectActivePanel,
  selectRankedPanels,
} from "@itsy.studio/studio/store/panels"

import { selectScreen } from "@itsy.studio/studio/store/screen"

import CodePanel from "@itsy.studio/studio/components/code-panel"
import HelpPanel from "@itsy.studio/studio/components/help-panel"
import PlayPanel from "@itsy.studio/studio/components/play-panel"
import styles from "./panels.module.scss"

interface PanelsProps {
  activePanel: Panel
  panels: Panel[]
  screen: Rect
}

const mapStateToProps = (state) => ({
  activePanel: selectActivePanel(state),
  panels: selectRankedPanels(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function Panels({ activePanel, panels, screen }: PanelsProps) {
  const superwide = {
    width: screen.width * panels.length,
  }

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanel.id])

  const minus = {
    marginLeft: screen.width * activePanel.rank * -1,
  }

  return (
    <View style={[styles.panels, superwide]}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        <CodePanel />
        <PlayPanel />
        <HelpPanel />
      </Animated.View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panels)
