import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import Button from "@itsy.studio/studio/components/button"
import DiskList from "@itsy.studio/studio/components/disk-list"
import Panel from "@itsy.studio/studio/components/panel"
import { createDisk, selectNormalDisks } from "@itsy.studio/studio/store/disks"
import styles from "./disks-panel.module.scss"

interface DisksPanelProps {
  createDisk: () => void
}

const mapStateToProps = (state) => ({
  disks: selectNormalDisks(state),
})

const mapDispatchToProps = {
  createDisk,
}

export function DisksPanel({ createDisk }: DisksPanelProps) {
  return (
    <Panel id="disks">
      <View style={styles.controls}>
        <Button onPress={() => createDisk()}>new</Button>
      </View>

      <DiskList />
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisksPanel)
