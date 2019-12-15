import React from "react"
import { StyleSheet, TextInput, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import Button from "../components/button"
import Disk from "../components/disk"
import Font from "../components/font"
import Frame from "../components/frame"
import Header from "../components/header"
import disks, { activeDisk } from "../store/disks"

const mapStateToProps = state => ({
  disk: activeDisk(state),
})

const mapDispatchToProps = {
  rename: disks.actions.rename,
}

export function DiskScreen({
  disk,
  navigation,
  rename,
}) {
  const [mode, setMode] = React.useState("neutral")
  const [name, setName] = React.useState(disk.name)

  const onRenameStart = () => setMode("rename")
  const onRenameEdit = newName => setName(newName)
  const onRenameSubmit = () => {
    setMode("neutral")
    rename(name)
  }
  const onEdit = () => {
    navigation.navigate("Code", { disk })
  }

  return (
    <Frame>
      <View style={styles.container}>
        <Disk id={disk.id} size={300} />

        {mode === "neutral" && (
          <TouchableHighlight onPress={onRenameStart}>
            <Font
              fontSize={32}
              color={colors[7]}
              borderColor={colors[0]}
              borderMultiplier={3}
              strokeMultiplier={0.9}
            >{disk.name}</Font>
          </TouchableHighlight>
        )}

        {mode === "rename" && (
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={onRenameEdit}
            onSubmitEditing={onRenameSubmit}
            style={styles.rename}
            textContentType="none"
            value={name}
          />
        )}

        <Button onPress={onEdit}>edit</Button>
      </View>
    </Frame>
  )
}

DiskScreen.navigationOptions = {
  header: Header
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[6],
    alignItems: "center",
    justifyContent: "center",
  },

  landscape: {
    flexDirection: "row",
  },

  portrait: {
    flexDirection: "column",
  },

  rename: {
    borderColor: colors[0],
    borderWidth: 2,
    backgroundColor: colors[7],
    fontSize: 18,
    padding: 4,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
