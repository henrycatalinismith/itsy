import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import Button from "@highvalley.systems/itsyexpo/components/button"
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
}

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.route.params.id],
})

const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function DiskScreen({ disk, navigation, route }: DiskScreenProps) {
  const rename = React.useCallback(
    () => navigation.navigate("Rename", route.params),
    []
  )

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
        <Button action={rename}>rename</Button>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
