import DiskPanelModeBrowseToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-toolbar"
import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./home.module.scss"

interface HomeScreenProps {
  disks: Disk[]
  navigation: StackNavigationProp<RootStackParamList, "Home">
  openDisk: (id: string) => void
}

const mapStateToProps = (state) => ({
  disks: selectDisksForBrowsePanel(state),
})

const mapDispatchToProps = {
  openDisk,
}

export function HomeScreen({ navigation, disks, openDisk }: HomeScreenProps) {
  const onNew = React.useCallback((disk: Disk) => {
    navigation.navigate("New")
  }, [])

  const onSelectDisk = React.useCallback((disk: Disk) => {
    // openDisk(disk.id)
    navigation.navigate("Disk", {
      id: disk.id,
      name: disk.name,
    })
  }, [])

  return (
    <View style={styles.component}>
      <DiskPanelModeBrowseToolbar onNew={onNew} />
      <DiskPicker disks={disks} onSelect={onSelectDisk} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
