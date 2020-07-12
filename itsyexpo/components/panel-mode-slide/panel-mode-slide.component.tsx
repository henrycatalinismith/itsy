import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DiskPanel from "@highvalley.systems/itsyexpo/components/disk-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import {
  PanelIds,
  selectVisiblePanel,
  selectRankedPanels,
  _Panel,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { Animated, LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-mode-slide.module.scss"

interface PanelModeSlideProps {
  activePanel: _Panel
  panels: _Panel[]
}

const mapStateToProps = (state) => ({
  activePanel: selectVisiblePanel(state),
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function PanelModeSlide({ activePanel, panels }: PanelModeSlideProps) {
  const superwide = {
    width: 1024,
  }

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanel.id])

  const minus = {
    marginLeft: 1024,
  }

  return (
    <View style={[styles.component, superwide]}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        {panels.map((panel) => (
          <Panel key={panel.id} id={panel.id}>
            {
              {
                [PanelIds.code]: <CodePanel key={panel.id} />,
                [PanelIds.disk]: <DiskPanel key={panel.id} />,
                [PanelIds.draw]: <DrawPanel key={panel.id} />,
                [PanelIds.play]: <PlayPanel key={panel.id} />,
                [PanelIds.help]: <HelpPanel key={panel.id} />,
              }[panel.id]
            }
          </Panel>
        ))}
      </Animated.View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelModeSlide)
