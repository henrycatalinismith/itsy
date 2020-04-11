import Toolbar, {
  ToolbarProps,
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import { closeDisk } from "@highvalley.systems/itsyexpo/store/disk"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelInspectorToolbarProps {
  closeDisk: () => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  closeDisk,
}

export function DiskPanelInspectorToolbar({
  closeDisk,
}: DiskPanelInspectorToolbarProps) {
  const buttons = []
  const theme = ToolbarThemes.DiskPanelInspector

  buttons.push({
    label: "done",
    action: closeDisk,
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
)(DiskPanelInspectorToolbar)
