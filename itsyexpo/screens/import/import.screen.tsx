import Font from "@highvalley.systems/itsyexpo/components/font"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { createDisk, Disk } from "@highvalley.systems/itsyexpo/store/disks"
import * as itsy from "@highvalley.systems/itsyplay"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import useAsyncEffect from "use-async-effect"
import styles from "./import.module.scss"

interface ImportScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Import">
  createDisk: (disk: Partial<Disk>) => Promise<Disk>
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createDisk,
}

export function ImportScreen({ navigation, createDisk }: ImportScreenProps) {
  const isFocused = useNavigation().isFocused()

  useAsyncEffect(async () => {
    if (!isFocused) {
      return
    }

    const file = await DocumentPicker.getDocumentAsync({ type: "text/html" })

    if (file.type === "cancel") {
      navigation.popToTop()
      return
    }

    const html = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.UTF8,
    })
    const rawDisk = itsy.read(html)
    const disk = await createDisk(rawDisk)
    navigation.navigate("Disk", {
      id: disk.id,
      name: disk.name,
    })
  }, [isFocused])

  return (
    <View style={styles.component}>
      <Font fontSize={24}>importing</Font>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportScreen)
