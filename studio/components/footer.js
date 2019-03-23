import React from "react"
import { Platform } from "react-native"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

import colors from "../constants/colors"
import TabBarIcon from "../components/tab-bar-icon"
import HomeScreen from "../screens/home"
import LinksScreen from "../screens/links"
import SettingsScreen from "../screens/settings"

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: "home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
})

LinksStack.navigationOptions = {
  tabBarLabel: "code",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: "help",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
}

const config = {
  tabBarOptions: {
    activeTintColor: colors[7],
    activeBackgroundColor: colors[14],
    labelStyle: {
      color: colors[1],
      fontFamily: "overpass-mono-bold",
      fontSize: 16,
    },
    style: {
      backgroundColor: colors[14],
    },
  },
}

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
}, config)
