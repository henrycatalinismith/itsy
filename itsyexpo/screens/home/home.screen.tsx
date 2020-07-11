import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import DiskPanelModeBrowseToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-toolbar"
import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import {
  HomeScreenModes,
  HomeScreenState,
  selectHomeScreen,
} from "@highvalley.systems/itsyexpo/store/screens"
import React from "react"
import { connect } from "react-redux"

interface HomeScreenProps {
  disks: Disk[]
  home: HomeScreenState
  navigation: StackNavigationProp<RootStackParamList, "Home">
  openDisk: (id: string) => void
}

const mapStateToProps = (state) => ({
  disks: selectDisksForBrowsePanel(state),
  home: selectHomeScreen(state),
})

const mapDispatchToProps = {
  openDisk,
}

export function HomeScreen({
  home,
  navigation,
  disks,
  openDisk,
}: HomeScreenProps) {
  const onSelect = React.useCallback((disk: Disk) => {
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [])

  return (
    <SafeArea>
      {home.mode === HomeScreenModes.List && (
        <>
          <DiskPanelModeBrowseToolbar />
          <DiskPicker disks={disks} onSelect={onSelect} />
        </>
      )}

      {home.mode === HomeScreenModes.Create && <></>}
    </SafeArea>
  )
}

HomeScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
