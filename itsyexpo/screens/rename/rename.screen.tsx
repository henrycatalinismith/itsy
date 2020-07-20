import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Disk, renameDisk } from "@highvalley.systems/itsyexpo/store/disks"
import Button, {
  ButtonSizes,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { connect } from "react-redux"
import { TextInput, View } from "react-native"
import styles from "./rename.module.scss"

export interface RenameScreenProps {
  disk: Disk
  navigation: StackNavigationProp<RootStackParamList, "Rename">
  route: RouteProp<RootStackParamList, "Rename">
  renameDisk: (id: string, name: string) => Promise<void>
}

const mapStateToProps = (state, ownProps) => ({
  disk: state.disks[ownProps.route.params.id],
})

const mapDispatchToProps = {
  renameDisk,
}

const Tab = createMaterialTopTabNavigator()

export function RenameScreen({
  disk,
  navigation,
  route,
  renameDisk,
}: RenameScreenProps) {
  const [name, onChange] = React.useState(disk.name)
  const onSubmit = () => {
    renameDisk(disk.id, name)
    navigation.pop()
  }
  const onCancel = () => navigation.pop()

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

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
        textContentType="none"
        value={name}
      />

      <View style={styles.actions}>
        <Button
          action={onSubmit}
          size={ButtonSizes.Wide}
          theme={ButtonThemes.Blue}
        >
          save
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

export default connect(mapStateToProps, mapDispatchToProps)(RenameScreen)
