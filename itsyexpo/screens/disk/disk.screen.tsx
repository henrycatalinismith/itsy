import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Code from "@highvalley.systems/itsyexpo/screens/code/code.screen"
import Draw from "@highvalley.systems/itsyexpo/screens/draw/draw.screen"
import Meta from "@highvalley.systems/itsyexpo/screens/meta/meta.screen"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

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
  return (
    <SafeArea>
      <Tab.Navigator>
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
