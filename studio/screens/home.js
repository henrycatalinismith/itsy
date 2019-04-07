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
import colors from "../constants/colors"
import select from "../selectors"
import thunks from "../thunks"

import Disk from "../components/disk"
import Floppy from "../components/floppy"
import Font from "../components/font"
import Header from "../components/header"

const mapStateToProps = state => ({
  disks: select.disks.from(state).forHomeScreen(),
})

const mapDispatchToProps = dispatch => ({
  onNew: () => dispatch(thunks.new()),
  open: diskId => dispatch(actions.open(diskId)),
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: Header
  }

  static propTypes = {
    disks: PropTypes.any,
    navigation: PropTypes.any,
    onNew: PropTypes.any,
    open: PropTypes.any,
  }

  render() {
    const {
      disks,
      navigation,
      onNew,
      open,
    } = this.props

    const onPress = disk => () => {
      open(disk.id)
      navigation.navigate("Code", { disk })
    }

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.frame1}>
          <View style={styles.frame2}>
            <ScrollView style={styles.container}>
              <TouchableOpacity style={styles.new} onPress={onNew}>
                <Font
                  fontSize={16}
                  color={colors[7]}
                  borderColor={colors[1]}
                  strokeMultiplier={0.9}
                  borderMultiplier={3}
                >new</Font>
              </TouchableOpacity>

              <FlatGrid
                itemDimension={128}
                items={disks}
                renderItem={({ item: disk }) => (
                  <Disk
                    key={disk.id}
                    id={disk.id}
                    onPress={onPress(disk)}
                    size={128}
                  />
                )}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors[14],
  },

  frame1: {
    flex: 1,
    display: "flex",
    borderRightColor: colors[14],
    borderBottomColor: colors[14],
    borderLeftColor: colors[14],
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },

  frame2: {
    flex: 1,
    display: "flex",
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },

  container: {
    flex: 1,
    backgroundColor: colors[7],
  },

  new: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors[13],
    borderColor: colors[2],
    borderWidth: 2,
    padding: 2,
    paddingBottom: 4,
    margin: 8,
    width: 100,
  },

  button: {
    width: 256,
    height: 256,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
