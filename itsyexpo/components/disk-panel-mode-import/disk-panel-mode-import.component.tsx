import useAsyncEffect from "use-async-effect"
import { Disk, createDisk } from "@highvalley.systems/itsyexpo/store/disks"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import * as itsy from "@highvalley.systems/itsyplay"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-import.module.scss"

interface DiskPanelModeImportProps {
  createDisk: (disk: Partial<Disk>) => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  createDisk,
}

export function DiskPanelModeImport({ createDisk }: DiskPanelModeImportProps) {
  useAsyncEffect(async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "text/html" })
    const html = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.UTF8,
    })
    const disk = itsy.read(html)
    createDisk(disk)
  }, [])

  return (
    <DiskPanelSubmodeCreate style={styles.component} title="import disk">
      <Font fontSize={24}>importing</Font>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeImport)
