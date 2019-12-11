import React from "react"

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native"

import { connect } from "react-redux"

import Disk from "../components/disk"
import Font from "../components/font"
import Frame from "../components/frame"
import Header from "../components/header"

import actions from "../actions"
import colors from "@itsy.studio/palettes/pico8/original.es6"
import select from "../selectors"
import thunks from "../thunks"

const mapStateToProps = (state, ownProps) => {
  const diskId = select.scalars.from(state).diskId()
  return {
    disk: select.disks.from(state).byId(diskId),
    edit: select.edits.from(state).byDiskId(diskId).pop(),
  }
}

const mapDispatchToProps = dispatch => ({
  rename: name => dispatch(thunks.rename(name)),
});

export function DiskScreen({
  disk,
  edit,
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
        <View style={styles.center}>
          <Disk
            disk={disk}
            edit={edit}
            size={300}
          />

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

          <TouchableOpacity style={styles.edit} onPress={onEdit}>
            <Font
              fontSize={16}
              color={colors[7]}
              borderColor={colors[1]}
              strokeMultiplier={0.9}
              borderMultiplier={3}
            >edit</Font>
          </TouchableOpacity>
        </View>
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

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    height: 320,
  },

  edit: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[13],
    borderColor: colors[5],
    borderWidth: 2,
    padding: 8,
    paddingBottom: 4,
    width: 64,
    marginTop: 32,
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
