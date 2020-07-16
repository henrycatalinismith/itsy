import TabNavigator from "@highvalley.systems/itsyexpo/components/tab-navigator"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Blank from "@highvalley.systems/itsyexpo/screens/blank"
import Import from "@highvalley.systems/itsyexpo/screens/import"
import Starters from "@highvalley.systems/itsyexpo/screens/starters"
import React from "react"
import { connect } from "react-redux"

export interface NewScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "New">
}

export type DiskTabParamList = {
  Play: { id: string }
  Code: { id: string }
  Draw: { id: string }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

const Tab = createMaterialTopTabNavigator()

export function NewScreen({}: NewScreenProps) {
  return (
    <TabNavigator tab={Tab}>
      <Tab.Screen name="quick" component={Starters} />
      <Tab.Screen name="blank" component={Blank} />
      <Tab.Screen name="import" component={Import} />
    </TabNavigator>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScreen)
