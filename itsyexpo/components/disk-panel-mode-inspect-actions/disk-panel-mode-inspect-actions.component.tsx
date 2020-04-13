import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelModeInspectButtonGroup, {
  DiskPanelModeInspectButtonGroupProps,
} from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect-button-group"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/disk-panel"
import { shareDisk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-inspect-actions.module.scss"

interface DiskPanelModeInspectActionsProps {
  setDiskPanelMode: (mode: DiskPanelModes) => void
  shareDisk: () => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  setDiskPanelMode,
  shareDisk,
}

export function DiskPanelModeInspectActions({
  setDiskPanelMode,
  shareDisk,
}: DiskPanelModeInspectActionsProps) {
  const title = "actions"
  const buttons = []

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Share)
    }, []),
    label: "share",
    text: "export playable disk",
    theme: ButtonThemes.Blue,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Rename)
    }, []),
    label: "rename",
    text: "change the disk's name",
    theme: ButtonThemes.Gray,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Sprite)
    }, []),
    label: "sprite",
    text: "change the disk's spritesheet",
    theme: ButtonThemes.Gray,
  })

  buttons.push({
    action: React.useCallback(() => {
      setDiskPanelMode(DiskPanelModes.Delete)
    }, []),
    label: "deletee",
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
