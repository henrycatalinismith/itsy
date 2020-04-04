import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DiskPanel from "@highvalley.systems/itsyexpo/components/disk-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import {
  PanelId,
  selectRankedPanels,
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
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function PanelModeTiles({ panels }: PanelModeTilesProps) {
  const activePanels = _.filter(panels, "active")

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanels.length])

  return (
    <View style={styles.component}>
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
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelModeTiles)
