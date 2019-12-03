import React from "react"
import { Icon } from "expo"

import colors from "../../constants/colors"

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={16}
        style={{ marginTop: -2 }}
        color={this.props.focused ? colors[1] : colors[12]}
      />
    )
  }
}
