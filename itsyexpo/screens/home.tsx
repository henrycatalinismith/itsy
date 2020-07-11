import { StackNavigationProp } from "@react-navigation/stack"
import DiskPanelModeBrowseToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-toolbar"
import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { connect } from "react-redux"

interface HomeScreenProps {
  navigation: StackNavigationProp
  disks: Disk[]
  openDisk: (id: string) => void
}

const mapStateToProps = (state) => ({
  disks: selectDisksForBrowsePanel(state),
})

const mapDispatchToProps = {
  openDisk,
}

export function HomeScreen({ navigation, disks, openDisk }: HomeScreenProps) {
  const onSelect = React.useCallback((disk: Disk) => {
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [])

  return (
    <SafeArea>
      <DiskPanelModeBrowseToolbar />
      <DiskPicker disks={disks} onSelect={onSelect} />
    </SafeArea>
  )
}

HomeScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
