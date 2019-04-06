import React from "react"

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native"

import { FlatGrid } from "react-native-super-grid"

import { connect } from "react-redux"

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"
import thunks from "../thunks"

import Disk from "../components/disk"
import Floppy from "../components/floppy"
import Font from "../components/font"
import Header from "../components/header"

const mapStateToProps = state => ({
  disks: select.disks.from(state).all(),
})

const mapDispatchToProps = dispatch => ({
  onNew: () => dispatch(thunks.new()),
  open: diskId => dispatch(actions.open(diskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  disks,
  navigation,
  onNew,
  open,
}) => {

  const onPress = diskId => () => {
    open(diskId)
    navigation.navigate("CodeStack")
  }

  return (
    <>
      <Header>
        <TouchableOpacity style={styles.new} onPress={onNew}>
          <Font
            fontSize={16}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >new</Font>
        </TouchableOpacity>
      </Header>
      <ScrollView style={styles.container}>

        <FlatGrid
          itemDimension={128}
          items={disks}
          renderItem={({ item: disk }) => (
            <Disk
              key={disk.id}
              id={disk.id}
              onPress={onPress(disk.id)}
              size={128}
            />
          )}
        />
      </ScrollView>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[7],
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },

  new: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[13],
    borderColor: colors[2],
    borderWidth: 2,
    padding: 2,
    paddingBottom: 4,
  },

  button: {
    width: 256,
    height: 256,
  },
})


        /*
        <Text>lol</Text>
        <Disk />
        <Font borderColor={1}>abcdefghijklm</Font>
        <Font
          fontSize={16}
          color={colors[10]}
          borderColor={colors[0]}
          borderMultiplier={1.5}
        >ALPHA!</Font>

        <Font
          fontSize={32}
          color={colors[8]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Universal</Font>

        <Font
          fontSize={32}
          color={colors[12]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Fantasy</Font>

        <Font
          fontSize={32}
          color={colors[11]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >Console</Font>

        <Font
          fontSize={24}
          color={colors[6]}
          borderColor={colors[0]}
          borderMultiplier={2}
        >something</Font>

        <Floppy size={256} />
        */

      
