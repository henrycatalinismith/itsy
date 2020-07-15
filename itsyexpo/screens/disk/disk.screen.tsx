import colors from "@highvalley.systems/palettes/pico8/original.es6"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Font from "@highvalley.systems/itsyexpo/components/font"
import Code from "@highvalley.systems/itsyexpo/screens/code/code.screen"
import Draw from "@highvalley.systems/itsyexpo/screens/draw/draw.screen"
import Meta from "@highvalley.systems/itsyexpo/screens/meta/meta.screen"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import {
  MaterialTopTabNavigationConfig,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs/lib/typescript/src/types"
import styles from "./disk.module.scss"

export interface DiskScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Disk">
  route: RouteProp<RootStackParamList, "Disk">
}

export type DiskTabParamList = {
  Play: { id: string }
  Code: { id: string }
  Draw: { id: string }
  Meta: { id: string }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function DiskScreen({ navigation, route }: DiskScreenProps) {
  const tabBarOptions: MaterialTopTabBarOptions = {
    showLabel: false,
    labelStyle: {
      color: "#ff0000",
    },
    renderBadge: (props: any) => {
      return (
        <View style={{ position: "absolute", right: 28, top: 5 }}>
          <Font fontSize={18}>{props.route.name.toLowerCase()}</Font>
        </View>
      )
    },
    style: styles.tabBar,
    indicatorStyle: styles.indicator,
  }

  const navigator: MaterialTopTabNavigationConfig = {
    tabBarOptions,
  }

  return (
    <SafeArea>
      <Tab.Navigator {...navigator}>
        <Tab.Screen
          name="Play"
          component={Play}
          initialParams={{ id: route.params.id }}
        />
        <Tab.Screen
          name="Code"
          component={Code}
          initialParams={{ id: route.params.id }}
        />
        <Tab.Screen
          name="Draw"
          component={Draw}
          initialParams={{ id: route.params.id }}
        />
        <Tab.Screen
          name="Meta"
          component={Meta}
          initialParams={{ id: route.params.id }}
        />
      </Tab.Navigator>
    </SafeArea>
  )
}

DiskScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
