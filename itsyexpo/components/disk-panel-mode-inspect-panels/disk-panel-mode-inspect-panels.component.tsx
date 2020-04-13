import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelModeInspectButtonGroup, {
  DiskPanelModeInspectButtonGroupProps,
} from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-button-group"
import {
  Panel,
  PanelIds,
  PanelModes,
  selectActivePanels,
  selectDevtoolsPanels,
  selectPanelMode,
  togglePanel,
} from "@highvalley.systems/itsyexpo/store/panels"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelModeInspectPanelsProps {
  activePanels: Panel[]
  devtoolsPanels: Panel[]
  panelMode: PanelModes
  togglePanel: (id: PanelIds) => void
}

const mapStateToProps = (state) => ({
  activePanels: selectActivePanels(state),
  devtoolsPanels: selectDevtoolsPanels(state),
  panelMode: selectPanelMode(state),
})

const mapDispatchToProps = {
  togglePanel,
}

const panelText: { [key in PanelIds]: string } = {
  [PanelIds.code]: "edit the disk's code",
  [PanelIds.play]: "run the disk",
  [PanelIds.draw]: "edit the spritesheet",
}

export function DiskPanelModeInspectPanels({
  activePanels,
  devtoolsPanels,
  panelMode,
  togglePanel,
}: DiskPanelModeInspectPanelsProps) {
  const title = "panels"
  const buttons = []
  const activeIds = _.map(activePanels, "id")

  devtoolsPanels.forEach((panel) => {
    const action = () => togglePanel(panel.id)
    const label = panel.id
    const text = panelText[panel.id]
    const theme = activeIds.includes(panel.id)
      ? ButtonThemes.Blue
      : ButtonThemes.Gray

    buttons.push({
      action,
      label,
      text,
      theme,
    })
  })

  const buttonGroup: DiskPanelModeInspectButtonGroupProps = {
    buttons,
    title,
  }

  return <DiskPanelModeInspectButtonGroup {...buttonGroup} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspectPanels)
