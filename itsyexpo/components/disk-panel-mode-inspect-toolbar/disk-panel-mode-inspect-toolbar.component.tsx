import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import HelpButton from "@highvalley.systems/itsyexpo/components/help-button"
import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import { closeDisk } from "@highvalley.systems/itsyexpo/store/disk"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelModeInspectToolbarProps {
  closeDisk: () => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  closeDisk,
}

export function DiskPanelModeInspectToolbar({
  closeDisk,
}: DiskPanelModeInspectToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.DiskPanelInspector

  buttons.push({
    label: "close",
    action: closeDisk,
    theme: ButtonThemes.Gray,
  })

  buttons.push(<HelpButton path="/disk/inspect" />)

  const toolbar: ToolbarProps = {
    buttons,
    theme,
  }

  return <Toolbar {...toolbar} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeInspectToolbar)
