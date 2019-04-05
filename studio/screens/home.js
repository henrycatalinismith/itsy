import React from "react"

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native"

import { connect } from "react-redux"

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"

import Disk from "../components/disk"
import Floppy from "../components/floppy"
import Font from "../components/font"
import Header from "../components/header"

const mapStateToProps = state => ({
  disks: select.disks.from(state).all(),
})

const mapDispatchToProps = dispatch => ({
  open: diskId => dispatch(actions.open(diskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(({
  disks,
  navigation,
  open,
}) => {

  const onPress = diskId => () => {
    open(diskId)
    navigation.navigate("CodeStack")
  }

  return (
    <>
      <Header>
        <TouchableHighlight style={styles.new}>
          <Font
            fontSize={16}
            color={colors[7]}
            borderColor={colors[1]}
            borderMultiplier={2}
          >new</Font>
        </TouchableHighlight>
      </Header>
      <ScrollView style={styles.container}>
        {Object.values(disks).map(disk => (
          <Disk
            key={disk.id}
            id={disk.id}
            onPress={onPress(disk.id)}
            size={128}
          />
        ))}
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
    backgroundColor: colors[11],
    borderColor: colors[3],
    borderWidth: 2,
    padding: 2,
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

      
