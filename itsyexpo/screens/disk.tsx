import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Code from "@highvalley.systems/itsyexpo/screens/code"
import Draw from "@highvalley.systems/itsyexpo/screens/draw"
import Meta from "@highvalley.systems/itsyexpo/screens/meta"
import Play from "@highvalley.systems/itsyexpo/screens/play"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

interface DiskScreenProps {}

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
