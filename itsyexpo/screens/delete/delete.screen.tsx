import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Disk, deleteDisk } from "@highvalley.systems/itsyexpo/store/disks"
import Button, {
  ButtonSizes,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import styles from "./delete.module.scss"

export interface DeleteScreenProps {
  disk: Disk
  navigation: StackNavigationProp<RootStackParamList, "Delete">
  route: RouteProp<RootStackParamList, "Delete">
  deleteDisk: (id: string) => Promise<void>
}

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.route.params.id],
})

const mapDispatchToProps = {
  deleteDisk,
}

const Tab = createMaterialTopTabNavigator()

export function DeleteScreen({
  disk,
  navigation,
  route,
  deleteDisk,
}: DeleteScreenProps) {
  const [deleted, setDeleted] = React.useState(false)
  const onConfirm = async () => {
    setDeleted(true)
    navigation.popToTop()
    await deleteDisk(disk.id)
  }
  const onCancel = () => navigation.pop()

  if (deleted) {
    return <></>
  }

  return (
    <View style={styles.component}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <DiskIcon disk={disk} size={128} />
        </View>
        <View style={styles.name}>
          <Font fontSize={24}>{`Delete ${disk.name}?`}</Font>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          action={onConfirm}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Blue}
        >
          delete
        </Button>
        <Button
          action={onCancel}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Red}
        >
          cancel
        </Button>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteScreen)
