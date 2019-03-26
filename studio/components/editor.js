import React from "react"
import PropTypes from "prop-types"

import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import WebView from "rn-webview"

import colors from "../constants/colors"

export default class Editor extends React.PureComponent {
  static propTypes = {
    lua: PropTypes.string,
    onChange: PropTypes.func,
    sourceUri: PropTypes.string,
  }

  componentDidMount() {
    this.webview.postMessage(JSON.stringify({
      type: "injectLua",
      lua: this.props.lua,
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    this.webview.postMessage(JSON.stringify({
      type: "init",
      lua: this.props.lua,
    }))
  }

  render() {
    const {
      lua,
      onChange,
      sourceUri,
    } = this.props

    const handleMessage = event => {
      const message = JSON.parse(event.nativeEvent.data)
      console.log(`🏓 ${message.type}`)
      switch (message.type) {
        case "ready":
          this.webview.postMessage(JSON.stringify({
            type: "init",
            lua,
          }))
          break

        case "change": return onChange(message.value)
        case "debug": return console.log(message)
      }
    }

    const options = { lua }

    return (
      <View style={styles.container}>
        <View style={styles.controls}>
        </View>
        <View style={styles.code}>
          <WebView
            bounces={false}
            onMessage={handleMessage}
            ref={(view) => { this.webview = view; }}
            scrollEnabled={false}
            source={{ uri: sourceUri }}
            useWebKit
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderTopColor: colors[2],
    borderRightColor: colors[2],
    borderBottomColor: colors[2],
    borderLeftColor: colors[2],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  controls: {
    height: 32,
    backgroundColor: colors[15],
    borderBottomColor: colors[13],
    borderBottomWidth: 2,
  },
  code: {
    flex: 1,
    borderTopColor: colors[6],
    borderTopWidth: 2,
  },
})
