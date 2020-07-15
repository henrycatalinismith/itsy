import { ButtonThemes } from "@highvalley.systems/itsyexpo/components/button"
import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import Toolbar, {
  ToolbarThemes,
} from "@highvalley.systems/itsyexpo/components/toolbar"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
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
}

const mapStateToProps = (state) => ({
  disks: selectDisksForBrowsePanel(state),
})

const mapDispatchToProps = {}

export function HomeScreen({ navigation, disks }: HomeScreenProps) {
  const onNew = React.useCallback((disk: Disk) => {
    navigation.navigate("New")
  }, [])

  const onSelectDisk = React.useCallback((disk: Disk) => {
    navigation.navigate("Disk", {
      id: disk.id,
      name: disk.name,
    })
  }, [])

  return (
    <View style={styles.component}>
      <Toolbar
        theme={ToolbarThemes.DiskPanelBrowser}
        buttons={[
          {
            label: "new",
            action: onNew,
            theme: ButtonThemes.Blue,
          },
        ]}
      />
      <DiskPicker disks={disks} onSelect={onSelectDisk} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
