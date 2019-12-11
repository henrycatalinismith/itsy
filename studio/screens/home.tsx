import React from "react"
import PropTypes from "prop-types"

import {
  SafeAreaView,
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
import colors from "@itsy.studio/palettes/pico8/original.es6"
import select from "../selectors"
import thunks from "../thunks"

import Tile from "../components/tile"
import Floppy from "../components/floppy"
import Frame from "../components/frame"
import Font from "../components/font"
import Header from "../components/header"

const mapStateToProps = state => ({
  disks: select.disks.from(state).forHomeScreen(),
})

const mapDispatchToProps = dispatch => ({
  onNew: () => dispatch(thunks.new()),
  open: diskId => dispatch(actions.open(diskId)),
});

export function HomeScreen({
  disks,
  navigation,
  onNew,
  open,
}) {
  const onPress = disk => () => {
    open(disk.id)
    navigation.navigate("Disk", { disk })
  }

  return (
    <Frame>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.new} onPress={onNew}>
          <Font
            fontSize={16}
            color={colors[7]}
            borderColor={colors[1]}
            strokeMultiplier={0.9}
            borderMultiplier={3}
          >new</Font>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>

        <FlatGrid
          itemDimension={128}
          items={disks}
          renderItem={({ item: disk }) => (
            <Tile
              key={disk.id}
              id={disk.id}
              onPress={onPress(disk)}
              size={120}
            />
          )}
        />
      </ScrollView>
    </Frame>
  )
}

HomeScreen.navigationOptions = {
  header: Header
}

const styles = StyleSheet.create({
  controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    backgroundColor: colors[15],
    borderBottomColor: colors[13],
    borderBottomWidth: 2,
    paddingLeft: 2,
  },

  container: {
    flex: 1,
    backgroundColor: colors[7],
  },

  new: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[13],
    borderColor: colors[5],
    borderWidth: 2,
    padding: 2,
    paddingBottom: 4,
    width: 64,
  },

  button: {
    width: 256,
    height: 256,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
  