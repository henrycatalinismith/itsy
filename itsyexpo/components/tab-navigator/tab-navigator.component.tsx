import React from "react"
import { LayoutChangeEvent, View } from "react-native"
import {
  MaterialTopTabNavigationConfig,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs/lib/typescript/src/types"
import Badge from "./badge.component"
import styles from "./tab-navigator.module.scss"

export interface TabNavigatorProps {
  children: any
  tab: any
}

export function TabNavigator({ children, tab: Tab }: TabNavigatorProps) {
  const [width, setWidth] = React.useState(0)

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  const tabCount = children.filter((c) => !!c).length
  const tabWidth = width / tabCount

  const tabBarOptions: MaterialTopTabBarOptions = {
    showLabel: false,
    labelStyle: {
      color: "#ff0000",
    },
    renderBadge: (props: any) => (
      <Badge label={props.route.name.toLowerCase()} width={tabWidth} />
    ),
    style: styles.tabBar,
    indicatorStyle: styles.indicator,
  }

  const navigator: MaterialTopTabNavigationConfig = {
    tabBarOptions,
    keyboardDismissMode: "auto",
  }

  return (
    <View style={styles.component} onLayout={onLayout}>
      <Tab.Navigator {...navigator}>{children}</Tab.Navigator>
    </View>
  )
}

export default TabNavigator
