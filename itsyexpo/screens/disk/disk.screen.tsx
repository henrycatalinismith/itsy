import * as Device from "expo-device"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Code from "@highvalley.systems/itsyexpo/screens/code/code.screen"
import Draw from "@highvalley.systems/itsyexpo/screens/draw/draw.screen"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import TabNavigator from "@highvalley.systems/itsyexpo/components/tab-navigator"
import React from "react"
import { connect } from "react-redux"
import { View } from "react-native"
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
  const multitask = !!Device.modelName.match(/iPad/)
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
      <View style={styles.tabWrapper}>
        <TabNavigator tab={Tab}>
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
        </TabNavigator>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
