import _ from "lodash"
import React from "react"
import { LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Rect } from "@itsy.studio/types/geometry"

import {
  PanelId,
  Panel,
  selectRankedPanels,
} from "@itsy.studio/studio/store/panels"

import CodePanel from "@itsy.studio/studio/components/code-panel"
import DisksPanel from "@itsy.studio/studio/components/disks-panel"
import HelpPanel from "@itsy.studio/studio/components/help-panel"
import PlayPanel from "@itsy.studio/studio/components/play-panel"
import styles from "./panel-tiler.module.scss"

interface PanelTilerProps {
  panels: Panel[]
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
      {panels.map(
        (panel) =>
          ({
            [PanelId.code]: <CodePanel key={panel.id} />,
            [PanelId.disks]: <DisksPanel key={panel.id} />,
            [PanelId.play]: <PlayPanel key={panel.id} />,
            [PanelId.help]: <HelpPanel key={panel.id} />,
          }[panel.id])
      )}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelTiler)
