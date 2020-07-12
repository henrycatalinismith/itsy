import * as itsy from "@highvalley.systems/itsyplay"
import useAsyncEffect from "use-async-effect"
import {
  selectStarters,
  useStarter,
} from "@highvalley.systems/itsyexpo/store/starters"
import Font from "@highvalley.systems/itsyexpo/components/font"
import Button, {
  ButtonSizes,
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import DiskPanelModeBrowseToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-toolbar"
import DiskPicker from "@highvalley.systems/itsyexpo/components/disk-picker"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import { openDisk } from "@highvalley.systems/itsyexpo/store/disk"
import {
  Disk,
  createDisk,
  createBlankDisk,
  selectDisksForBrowsePanel,
} from "@highvalley.systems/itsyexpo/store/disks"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import words from "@highvalley.systems/itsyexpo/words"
import React from "react"
import { TextInput, View } from "react-native"
import { connect } from "react-redux"
import styles from "./home.module.scss"

interface HomeScreenProps {
  disks: Disk[]
  navigation: StackNavigationProp<RootStackParamList, "Home">
  openDisk: (id: string) => void
  starters: Disk[]
  useStarter: (id: string) => Promise<Disk>
  createBlankDisk: (name: string) => Promise<Disk>
  createDisk: (disk: Partial<Disk>) => Promise<Disk>
}

export enum HomeScreenModes {
  List = "List",
  Create = "Create",
  Blank = "Blank",
  Import = "Import",
  Starter = "Starter",
}

const mapStateToProps = (state) => ({
  disks: selectDisksForBrowsePanel(state),
  starters: selectStarters(state),
})

const mapDispatchToProps = {
  openDisk,
  useStarter,
  createBlankDisk,
  createDisk,
}

export function HomeScreen({
  navigation,
  disks,
  openDisk,
  starters,
  useStarter,
  createBlankDisk,
  createDisk,
}: HomeScreenProps) {
  const [mode, setMode] = React.useState(HomeScreenModes.List)
  const [name, setName] = React.useState("")

  const onNew = React.useCallback((disk: Disk) => {
    setMode(HomeScreenModes.Create)
  }, [])

  const onBlank = React.useCallback(() => {
    setMode(HomeScreenModes.Blank)
    setName(words())
  }, [])

  const onImport = React.useCallback(() => {
    setMode(HomeScreenModes.Import)
  }, [])

  const onStarter = React.useCallback(() => {
    setMode(HomeScreenModes.Starter)
  }, [])

  const onSelectDisk = React.useCallback((disk: Disk) => {
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [])

  const onSelectStarter = React.useCallback(async (starter: Disk) => {
    const disk = await useStarter(starter.id)
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [])

  const onBlankRename = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onBlankCancel = React.useCallback(() => {
    setMode(HomeScreenModes.List)
  }, [])

  const onBlankSubmit = React.useCallback(async () => {
    const disk = await createBlankDisk(name)
    openDisk(disk.id)
    navigation.navigate("Disk")
  }, [name])

  useAsyncEffect(async () => {
    if (mode === HomeScreenModes.Import) {
      const file = await DocumentPicker.getDocumentAsync({ type: "text/html" })
      const html = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      })
      const rawDisk = itsy.read(html)
      const disk = await createDisk(rawDisk)
      openDisk(disk.id)
      navigation.navigate("Disk")
    }
  }, [mode])

  return (
    <SafeArea>
      {mode === HomeScreenModes.List && (
        <>
          <DiskPanelModeBrowseToolbar onNew={onNew} />
          <DiskPicker disks={disks} onSelect={onSelectDisk} />
        </>
      )}

      {mode === HomeScreenModes.Create && (
        <>
          <View style={styles.create}>
            <View style={styles.createTemplate}>
              <Button
                action={onStarter}
                size={ButtonSizes.Large}
                theme={ButtonThemes.Blue}
              >
                quick start
              </Button>
            </View>

            <View style={styles.createBlank}>
              <Button
                action={onBlank}
                size={ButtonSizes.Large}
                theme={ButtonThemes.Gray}
              >
                blank
              </Button>
            </View>

            <View style={styles.createImportt}>
              <Button
                action={onImport}
                size={ButtonSizes.Large}
                theme={ButtonThemes.Gray}
              >
                import
              </Button>
            </View>
          </View>
        </>
      )}

      {mode === HomeScreenModes.Starter && (
        <DiskPicker disks={starters} onSelect={onSelectStarter} />
      )}

      {mode === HomeScreenModes.Blank && (
        <View style={styles.blank}>
          <Font fontSize={24}>name</Font>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={onBlankRename}
            onSubmitEditing={onBlankSubmit}
            style={styles.blankInput}
            textContentType="none"
            value={name}
          />
          <View style={styles.blankButtons}>
            <View style={styles.blankSave}>
              <Button action={onBlankSubmit} theme={ButtonThemes.Blue}>
                create
              </Button>
            </View>
            <View style={styles.blankCancel}>
              <Button action={onBlankCancel} theme={ButtonThemes.Red}>
                cancel
              </Button>
            </View>
          </View>
        </View>
      )}

      {mode === HomeScreenModes.Import && <Font fontSize={24}>importing</Font>}
    </SafeArea>
  )
}

HomeScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
