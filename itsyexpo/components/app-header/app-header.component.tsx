import AppHeaderIcon from "@highvalley.systems/itsyexpo/components/app-header-icon"
import AppHeaderStorageIndicator from "@highvalley.systems/itsyexpo/components/app-header-storage-indicator"
import AppHeaderTitle from "@highvalley.systems/itsyexpo/components/app-header-title"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header.module.scss"

interface AppHeaderProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function AppHeader({}: AppHeaderProps) {
  return (
    <View style={styles.component}>
      <AppHeaderIcon />
      <AppHeaderTitle />
      <AppHeaderStorageIndicator />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
