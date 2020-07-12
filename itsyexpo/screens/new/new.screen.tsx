import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Blank from "@highvalley.systems/itsyexpo/screens/blank"
import Import from "@highvalley.systems/itsyexpo/screens/import"
import Starters from "@highvalley.systems/itsyexpo/screens/starters"
import React from "react"
import { connect } from "react-redux"

interface NewScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "New">
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function NewScreen({}: NewScreenProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Quick Start" component={Starters} />
      <Tab.Screen name="Blank Disk" component={Blank} />
      <Tab.Screen name="Import" component={Import} />
    </Tab.Navigator>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScreen)
