import React from "react"
import PropTypes from "prop-types"

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  WebView,
  View,
} from "react-native"

// import WebView from "rn-webview"

import { FlatGrid } from "react-native-super-grid"

import { connect } from "react-redux"

import actions from "../actions"
import colors from "../constants/colors"
import select from "../selectors"
import thunks from "../thunks"

import Tile from "../components/tile"
import Floppy from "../components/floppy"
import Font from "../components/font"
import Header from "../components/header"

const mapStateToProps = state => ({
  asset: select.assets.from(state).forHelpScreen(),
})

const mapDispatchToProps = dispatch => ({
  // onNew: () => dispatch(thunks.new()),
  // open: diskId => dispatch(actions.open(diskId)),
});

class HelpScreen extends React.Component {
  static navigationOptions = {
    header: Header
  }

  static propTypes = {
    asset: PropTypes.any,
    navigation: PropTypes.any,
  }

  render() {
    const {
      asset,
    } = this.props

    console.log("help")
    console.log(asset.uri)

    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.frame1}>
          <View style={styles.frame2}>

            <View style={styles.container}>
              <WebView
                bounces={false}
                originWhitelist={["*"]}
                scrollEnabled={true}
                source={{ uri: asset.uri }}
                style={styles.webView}
                useWebKit
              />
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
    flex: 10,
    display: "flex",
    backgroundColor: colors[7],
  },

  webView: {
    flex: 10,
    borderColor: colors[14],
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
