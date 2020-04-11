import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import { createDisk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelBrowserToolbarProps {
  createDisk: () => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  createDisk,
}

export function DiskPanelBrowserToolbar({
  createDisk,
}: DiskPanelBrowserToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.DiskPanelBrowser

  buttons.push({
    label: "new",
    action: createDisk,
  })

  const toolbar: ToolbarProps = {
    buttons,
    theme,
  }

  return <Toolbar {...toolbar} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelBrowserToolbar)
