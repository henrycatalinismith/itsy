import React from "react"
import { Animated, LayoutAnimation, View } from "react-native"
import { connect } from "react-redux"
import { Rect } from "@itsy.studio/types/geometry"

import {
  DevtoolsPanelId,
  selectDevtoolsPanel,
} from "@itsy.studio/studio/store/devtools"

import { selectScreen } from "@itsy.studio/studio/store/screen"

import DevtoolsCodePanel from "@itsy.studio/studio/components/devtools-code-panel"
import DevtoolsHelpPanel from "@itsy.studio/studio/components/devtools-help-panel"
import DevtoolsPlayPanel from "@itsy.studio/studio/components/devtools-play-panel"
import styles from "./devtools-panels.module.scss"

interface DevtoolsPanelsProps {
  panel: DevtoolsPanelId
  screen: Rect
}

const mapStateToProps = (state) => ({
  panel: selectDevtoolsPanel(state),
  screen: selectScreen(state),
})

const mapDispatchToProps = {}

export function DevtoolsPanels({ panel, screen }: DevtoolsPanelsProps) {
  const offsetMap: { [p: string]: number } = {
    [DevtoolsPanelId.code]: 0,
    [DevtoolsPanelId.play]: 1,
    [DevtoolsPanelId.help]: 2,
  }

  const translateX = offsetMap[panel] * screen.width * 1

  const superwide = {
    width: screen.width * 3,
  }

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [panel])

  const minus = {
    marginLeft: screen.width * offsetMap[panel] * -3,
  }

  console.log(panel, translateX)

  return (
    <View style={[styles.devtoolsPanels, superwide]}>
      <Animated.View style={{ ...styles.slider, ...minus }}>
        <DevtoolsCodePanel />
        <DevtoolsPlayPanel />
        <DevtoolsHelpPanel />
      </Animated.View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DevtoolsPanels)
