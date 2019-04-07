import React from "react"

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { connect } from "react-redux"

import Disk from "../components/disk"
import Font from "../components/font"
import Header from "../components/header"

import actions from "../actions"
import colors from "../constants/colors"
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
});

class DiskScreen extends React.Component {
  static navigationOptions = {
    header: Header
  }

  render() {
    const {
      disk,
      edit,
      navigation,
    } = this.props

    const onEdit = () => {
      navigation.navigate("Code", { disk })
    }

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.frame1}>
          <View style={styles.frame2}>
            <View style={styles.container}>
              <View style={styles.center}>
                <Disk
                  disk={disk}
                  edit={edit}
                  size={300}
                />

                <Font
                  fontSize={32}
                  color={colors[7]}
                  borderColor={colors[0]}
                  borderMultiplier={3}
                  strokeMultiplier={0.9}
                >{disk.name}</Font>

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
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
