import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelModeInspectButtonGroup, {
  DiskPanelModeInspectButtonGroupProps,
} from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-button-group"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"

interface DiskPanelModeInspectActionsProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  setDiskPanelMode,
}

export function DiskPanelModeInspectActions({
  setDiskPanelMode,
}: DiskPanelModeInspectActionsProps) {
  const title = "actions"
  const buttons = []

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Share)
    }, []),
    label: "share",
    text: "export the disk",
    theme: ButtonThemes.Blue,
  })

  buttons.push({
    action: React.useCallback(() => {
      // setDiskPanelMode(DiskPanelModes.Share)
    }, []),
    label: "copy",
    text: "duplicate the disk",
    theme: ButtonThemes.Gray,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Sprite)
    }, []),
    label: "sprite",
    text: "export the spritesheet",
    theme: ButtonThemes.Gray,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Rename)
    }, []),
    label: "rename",
    text: "rename the disk",
    theme: ButtonThemes.Gray,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Delete)
    }, []),
    label: "delete",
    text: "delete the disk",
    theme: ButtonThemes.Red,
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
)(DiskPanelModeInspectActions)
