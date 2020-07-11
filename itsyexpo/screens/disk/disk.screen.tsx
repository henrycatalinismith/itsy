import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Code from "@highvalley.systems/itsyexpo/screens/code/code.screen"
import Draw from "@highvalley.systems/itsyexpo/screens/draw/draw.screen"
import Meta from "@highvalley.systems/itsyexpo/screens/meta/meta.screen"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

interface DiskScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Disk">
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function DiskScreen({}: DiskScreenProps) {
  return (
    <SafeArea>
      <Tab.Navigator>
        <Tab.Screen name="Play" component={Play} />
        <Tab.Screen name="Code" component={Code} />
        <Tab.Screen name="Draw" component={Draw} />
        <Tab.Screen name="Meta" component={Meta} />
      </Tab.Navigator>
    </SafeArea>
  )
}

DiskScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskScreen)
