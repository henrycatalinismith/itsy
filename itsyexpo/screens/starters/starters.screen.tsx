import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import {
  selectStarters,
  useStarter,
} from "@highvalley.systems/itsyexpo/store/starters"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./starters.module.scss"

interface StartersScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Starters">
  starters: Disk[]
  useStarter: (id: string) => Promise<Disk>
}

const mapStateToProps = (state) => ({
  starters: selectStarters(state),
})

const mapDispatchToProps = {
  useStarter,
}

export function StartersScreen({
  navigation,
  starters,
  useStarter,
}: StartersScreenProps) {
  const onSelectStarter = React.useCallback(async (starter: Disk) => {
    const disk = await useStarter(starter.id)
    navigation.navigate("Disk", {
      id: disk.id,
      name: disk.name,
    })
  }, [])

  return (
    <View style={styles.component}>
      <Font fontSize={24}>quick start</Font>
      <DiskPicker disks={starters} onSelect={onSelectStarter} />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StartersScreen)
