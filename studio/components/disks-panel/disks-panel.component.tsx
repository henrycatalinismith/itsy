import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import Button from "@itsy.studio/studio/components/button"
import Panel from "@itsy.studio/studio/components/panel"
import Tile from "@itsy.studio/studio/components/tile"
import {
  Disk,
  createDisk,
  openDisk,
  selectNormalDisks,
} from "@itsy.studio/studio/store/disks"
import { ScreenState, selectScreen } from "@itsy.studio/studio/store/screen"
import styles from "./disks-panel.module.scss"

interface DisksPanelProps {
  disks: Disk[]
  createDisk: () => void
  openDisk: (id: string) => void
  screen: ScreenState
}

const mapStateToProps = (state) => ({
  disks: selectNormalDisks(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {
  createDisk,
  openDisk,
}

export function DisksPanel({
  createDisk,
  disks,
  openDisk,
  screen,
}: DisksPanelProps) {
  const onPress = React.useCallback(
    (disk) => () => {
      openDisk(disk.id)
    },
    []
  )

  return (
    <Panel id="disks">
      <View style={styles.controls}>
        <Button onPress={() => createDisk()}>new</Button>
      </View>

      <ScrollView style={styles.scrollView}>
        {disks.map((disk) => (
          <Tile key={disk.id} id={disk.id} onPress={onPress(disk)} size={120} />
        ))}
      </ScrollView>
    </Panel>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisksPanel)
