import React from "react"

import {
  Platform,
  View,
} from "react-native"

import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation"

import colors from "../constants/colors"
import Font from "../components/font"
import TabBarIcon from "../components/tab-bar-icon"
import HomeScreen from "../screens/home"
import CodeScreen from "../screens/code"
import HelpScreen from "../screens/help"

const defaultNavigationOptions = {
  header: null,
}

const stackNavigatorConfig = {
  defaultNavigationOptions,
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, stackNavigatorConfig)

const c = focused => focused ? colors[12] : colors[7]
const b = focused => focused ? colors[7] : colors[13]

HomeStack.navigationOptions = {
  tabBarLabel: "home",
  tabBarIcon: ({ focused }) => (
    <Font
      fontSize={24}
      color={c(focused)}
      borderColor={b(focused)}
      borderMultiplier={2}
    >home</Font>
  ),
}

const CodeStack = createStackNavigator({
  Code: CodeScreen,
}, stackNavigatorConfig)

CodeStack.navigationOptions = {
  tabBarLabel: "code",
  tabBarIcon: ({ focused }) => (
    <Font
      fontSize={24}
      color={c(focused)}
      borderColor={b(focused)}
      borderMultiplier={2}
    >code</Font>
  ),
}

const HelpStack = createStackNavigator({
  Help: HelpScreen,
}, stackNavigatorConfig)

HelpStack.navigationOptions = {
  tabBarLabel: "help",
  tabBarIcon: ({ focused }) => (
    <Font
      fontSize={24}
      color={c(focused)}
      borderColor={b(focused)}
      borderMultiplier={2}
    >help</Font>
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
    showLabel: false,
    style: {
      backgroundColor: colors[14],
    },
  },
}

export default createBottomTabNavigator({
  CodeStack,
  HomeStack,
  HelpStack,
}, config)
