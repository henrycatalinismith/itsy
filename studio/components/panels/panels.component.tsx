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

import { selectSafeArea } from "@itsy.studio/studio/store/safe-area"

import CodePanel from "@itsy.studio/studio/components/code-panel"
import DisksPanel from "@itsy.studio/studio/components/disks-panel"
import HelpPanel from "@itsy.studio/studio/components/help-panel"
import PlayPanel from "@itsy.studio/studio/components/play-panel"
import styles from "./panels.module.scss"

interface PanelsProps {
  activePanel: Panel
  panels: Panel[]
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  activePanel: selectActivePanel(state),
  panels: selectRankedPanels(state),
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panels({ activePanel, panels, safeArea }: PanelsProps) {
  const superwide = {
    width: safeArea.width * panels.length,
  }

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanel.id])

  const minus = {
    marginLeft: safeArea.width * activePanel.rank * -1,
  }

  const onLayout = (event) => {
    // console.log(event)
  }

  return (
    <View style={[styles.panels, superwide]} onLayout={onLayout}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        {panels.map(
          (panel) =>
            ({
              [PanelId.code]: <CodePanel key={panel.id} />,
              [PanelId.disks]: <DisksPanel key={panel.id} />,
              [PanelId.play]: <PlayPanel key={panel.id} />,
              [PanelId.help]: <HelpPanel key={panel.id} />,
            }[panel.id])
        )}
      </Animated.View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Panels)
