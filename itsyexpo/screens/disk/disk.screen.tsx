import * as Device from "expo-device"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Font from "@highvalley.systems/itsyexpo/components/font"
import Code from "@highvalley.systems/itsyexpo/screens/code/code.screen"
import Draw from "@highvalley.systems/itsyexpo/screens/draw/draw.screen"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import React from "react"
import { connect } from "react-redux"
import { LayoutChangeEvent, LayoutRectangle, View } from "react-native"
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
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function DiskScreen({ navigation, route }: DiskScreenProps) {
  const [tabsLayout, setTabsLayout] = React.useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const onTabsLayout = React.useCallback((event: LayoutChangeEvent) => {
    setTabsLayout(event.nativeEvent.layout)
  }, [])

  const multitask = !!Device.modelName.match(/iPad/)
  const tabCount = multitask ? 2 : 3
  const tabWidth = tabsLayout.width / tabCount

  const tabBarOptions: MaterialTopTabBarOptions = {
    showLabel: false,
    labelStyle: {
      color: "#ff0000",
    },
    renderBadge: (props: any) => {
      return (
        <View
          style={{ position: "absolute", right: tabWidth / 2 - 20, top: 5 }}
        >
          <Font fontSize={18}>{props.route.name.toLowerCase()}</Font>
        </View>
      )
    },
    style: styles.tabBar,
    indicatorStyle: styles.indicator,
  }

  const navigator: MaterialTopTabNavigationConfig = {
    tabBarOptions,
    keyboardDismissMode: "auto",
  }

  const componentStyles = [styles.component]

  if (multitask) {
    componentStyles.push(styles.tiles)
  }

  return (
    <View style={componentStyles}>
      {multitask && (
        <View style={styles.playWrapper}>
          <Play navigation={navigation} route={route} />
        </View>
      )}
      <View style={styles.tabWrapper} onLayout={onTabsLayout}>
        <Tab.Navigator {...navigator}>
          {!multitask && (
            <Tab.Screen
              name="Play"
              component={Play}
              initialParams={{ id: route.params.id }}
            />
          )}
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
        </Tab.Navigator>
      </View>
    </View>
  )
}

DiskScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
