import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import HelpButton from "@highvalley.systems/itsyexpo/components/help-button"
import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelModeBrowseToolbarProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  setDiskPanelMode,
}

export function DiskPanelModeBrowseToolbar({
  setDiskPanelMode,
}: DiskPanelModeBrowseToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.DiskPanelBrowser

  buttons.push({
    label: "new",
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Create)
    }, []),
    theme: ButtonThemes.Blue,
  })

  buttons.push(<HelpButton path="/disk/browse" />)

  const toolbar: ToolbarProps = {
    buttons,
    theme,
  }

  return <Toolbar {...toolbar} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeBrowseToolbar)
