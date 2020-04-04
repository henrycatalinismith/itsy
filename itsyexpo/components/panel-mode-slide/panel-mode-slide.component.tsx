import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DiskPanel from "@highvalley.systems/itsyexpo/components/disk-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import {
  PanelId,
  selectActivePanel,
  selectRankedPanels,
  _Panel,
} from "@highvalley.systems/itsyexpo/store/panels"
import { selectSafeArea } from "@highvalley.systems/itsyexpo/store/safe-area"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { Animated, LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-mode-slide.module.scss"

interface PanelModeSlideProps {
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

export function PanelModeSlide({
  activePanel,
  panels,
  safeArea,
}: PanelModeSlideProps) {
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
    <View style={[styles.component, superwide]}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        {panels.map((panel) => (
          <Panel key={panel.id} id={panel.id}>
            {
              {
                [PanelId.code]: <CodePanel key={panel.id} />,
                [PanelId.disk]: <DiskPanel key={panel.id} />,
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

export default connect(mapStateToProps, mapDispatchToProps)(PanelModeSlide)
