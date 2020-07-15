import { CompositeNavigationProp, RouteProp } from "@react-navigation/native"
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs"
import { DiskTabParamList } from "@highvalley.systems/itsyexpo/screens/disk"
import { RootStackParamList } from "@highvalley.systems/itsyexpo/screens"
import { StackNavigationProp } from "@react-navigation/stack"
import DiskPanelModeInspect from "@highvalley.systems/itsyexpo/components/disk-panel-mode-inspect"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

interface MetaScreenProps {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<DiskTabParamList, "Meta">,
    StackNavigationProp<RootStackParamList>
  >
  route: RouteProp<DiskTabParamList, "Meta">
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export function MetaScreen({}: MetaScreenProps) {
  // <DiskPanelModeInspect />
  return <SafeArea></SafeArea>
}

MetaScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaScreen)
