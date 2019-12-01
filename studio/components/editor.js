import React from "react"
import PropTypes from "prop-types"

import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import WebView from "rn-webview"

import colors from "../constants/colors"

export default class Editor extends React.Component {
  static propTypes = {
    lua: PropTypes.string,
    onChange: PropTypes.func,
    sourceUri: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return false
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
  }w

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
            type: "inject",
            lua,
          }))
          break

        case "change":
          // console.log(lua)
          // console.log(message.lua)
          if (message.lua === lua) {
            //console.log("SAME LOLOLOLOL")
          } else {
            onChange(message.lua)
          }
          return

        default: return // console.log(`🤷‍♀️ ${message.type}`)
      }
    }

    const options = { lua }

    return (
      <View style={styles.code}>
        <WebView
          bounces={false}
          injectedJavaScript="window.isReactNative = true;"
          onMessage={handleMessage}
          ref={(view) => { this.webview = view; }}
          scrollEnabled={false}
          source={{ uri: sourceUri }}
          useWebKit
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
