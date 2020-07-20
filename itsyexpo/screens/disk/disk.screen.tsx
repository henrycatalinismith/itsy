import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import {
  Disk,
  copyDisk,
  shareDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import Button, {
  ButtonSizes,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import styles from "./disk.module.scss"

export interface DiskScreenProps {
  disk: Disk
  navigation: StackNavigationProp<RootStackParamList, "Disk">
  route: RouteProp<RootStackParamList, "Disk">
  shareDisk: (id: string) => Promise<void>
  copyDisk: (id: string, name: string) => Promise<Disk>
}

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.route.params.id],
})

const mapDispatchToProps = {
  copyDisk,
  shareDisk,
}

const Tab = createMaterialTopTabNavigator()

export function DiskScreen({
  disk,
  navigation,
  route,
  shareDisk,
  copyDisk,
}: DiskScreenProps) {
  const onShare = () => {
    shareDisk(disk.id)
  }

  const onRename = () => {
    navigation.navigate("Rename", route.params)
  }

  const onCopy = async () => {
    const newDisk = await copyDisk(disk.id, `Copy of ${disk.name}`)
    navigation.popToTop()
    navigation.navigate("Devtools", { id: newDisk.id })
  }

  const onDelete = () => {
    navigation.navigate("Delete", route.params)
  }

  return (
    <View style={styles.component}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <DiskIcon disk={disk} size={128} />
        </View>
        <View style={styles.name}>
          <Font fontSize={24}>{disk.name}</Font>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          action={onShare}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Green}
        >
          share
        </Button>
        <Button
          action={onRename}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Orange}
        >
          rename
        </Button>
        <Button
          action={onCopy}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Gray}
        >
          copy
        </Button>
        <Button
          action={onDelete}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Red}
        >
          delete
        </Button>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
