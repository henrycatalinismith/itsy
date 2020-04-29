import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DiskPanel from "@highvalley.systems/itsyexpo/components/disk-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import {
  PanelIds,
  selectRankedPanels,
  selectVisiblePanels,
  _Panel,
} from "@highvalley.systems/itsyexpo/store/panels"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel-mode-tiles.module.scss"

interface PanelModeTilesProps {
  panels: _Panel[]
  visiblePanels: _Panel[]
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  panels: selectRankedPanels(state),
  visiblePanels: selectVisiblePanels(state),
})

const mapDispatchToProps = {}

export function PanelModeTiles({ panels, visiblePanels }: PanelModeTilesProps) {
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [visiblePanels.length])

  return (
    <View style={styles.component}>
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
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelModeTiles)
