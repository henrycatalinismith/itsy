import DiskPanelBrowserList from "@highvalley.systems/itsyexpo/components/disk-panel-browser-list"
import DiskPanelBrowserToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-browser-toolbar"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-browser.module.scss"

interface DiskPanelBrowserProps {}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelBrowser({}: DiskPanelBrowserProps) {
  return (
    <View style={styles.component}>
      <DiskPanelBrowserToolbar />
      <DiskPanelBrowserList />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelBrowser)
