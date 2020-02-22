import React from "react"
import { Animated, LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Rect } from "@itsy.studio/types/geometry"

import {
  PanelId,
  _Panel,
  selectActivePanel,
  selectRankedPanels,
} from "@highvalley.systems/itsyexpo/store/panels"

import { selectSafeArea } from "@highvalley.systems/itsyexpo/store/safe-area"

import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DisksPanel from "@highvalley.systems/itsyexpo/components/disks-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import styles from "./panel-slider.module.scss"

interface PanelSliderProps {
  activePanel: _Panel
  panels: _Panel[]
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  activePanel: selectActivePanel(state),
  panels: selectRankedPanels(state),
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function PanelSlider({
  activePanel,
  panels,
  safeArea,
}: PanelSliderProps) {
  const superwide = {
    width: safeArea.width * panels.length,
  }

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanel.id])

  const minus = {
    marginLeft: safeArea.width * activePanel.rank * -1,
  }

  return (
    <View style={[styles.panels, superwide]}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        {panels.map((panel) => (
          <Panel key={panel.id} id={panel.id}>
            {
              {
                [PanelId.code]: <CodePanel key={panel.id} />,
                [PanelId.disks]: <DisksPanel key={panel.id} />,
                [PanelId.draw]: <DrawPanel key={panel.id} />,
                [PanelId.play]: <PlayPanel key={panel.id} />,
                [PanelId.help]: <HelpPanel key={panel.id} />,
              }[panel.id]
            }
          </Panel>
        ))}
      </Animated.View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelSlider)
