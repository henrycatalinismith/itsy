import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import Font from "@highvalley.systems/itsyexpo/components/font"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import { createBlankDisk, Disk } from "@highvalley.systems/itsyexpo/store/disks"
import words from "@highvalley.systems/itsyexpo/words"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./blank.module.scss"

interface BlankScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Blank">
  createBlankDisk: (name: string) => Promise<Disk>
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createBlankDisk,
}

export function BlankScreen({ navigation, createBlankDisk }: BlankScreenProps) {
  const [name, setName] = React.useState(words())

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onCancel = React.useCallback(() => {
    navigation.popToTop()
  }, [])

  const onSubmit = React.useCallback(async () => {
    const disk = await createBlankDisk(name)
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [name])

  return (
    <View style={styles.component}>
      <Font fontSize={24}>name</Font>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.blankInput}
        textContentType="none"
        value={name}
      />
      <View style={styles.blankButtons}>
        <View style={styles.blankSave}>
          <Button action={onSubmit} theme={ButtonThemes.Blue}>
            create
          </Button>
        </View>
        <View style={styles.blankCancel}>
          <Button action={onCancel} theme={ButtonThemes.Red}>
            cancel
          </Button>
        </View>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlankScreen)
