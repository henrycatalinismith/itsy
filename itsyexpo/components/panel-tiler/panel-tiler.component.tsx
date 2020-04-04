import _ from "lodash"
import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Rect } from "@highvalley.systems/typedefs/itsy"

import {
  PanelId,
  _Panel,
  selectRankedPanels,
} from "@highvalley.systems/itsyexpo/store/panels"

import CodePanel from "@highvalley.systems/itsyexpo/components/code-panel"
import DiskPanel from "@highvalley.systems/itsyexpo/components/disk-panel"
import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import HelpPanel from "@highvalley.systems/itsyexpo/components/help-panel"
import Panel from "@highvalley.systems/itsyexpo/components/panel"
import PlayPanel from "@highvalley.systems/itsyexpo/components/play-panel"
import styles from "./panel-tiler.module.scss"

interface PanelTilerProps {
  panels: _Panel[]
  safeArea: Rect
}

const mapStateToProps = (state) => ({
  panels: selectRankedPanels(state),
})

const mapDispatchToProps = {}

export function PanelTiler({ panels }: PanelTilerProps) {
  const activePanels = _.filter(panels, "active")

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [activePanels.length])

  return (
    <View style={[styles.panels]}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PanelTiler)
