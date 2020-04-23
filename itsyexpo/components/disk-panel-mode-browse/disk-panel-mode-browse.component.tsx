import DiskPanelModeBrowseList from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-list"
import DiskPanelModeBrowseToolbar from "@highvalley.systems/itsyexpo/components/disk-panel-mode-browse-toolbar"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-browse.module.scss"

interface DiskPanelModeBrowseProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeBrowse({}: DiskPanelModeBrowseProps) {
  return (
    <View style={styles.component}>
      <DiskPanelModeBrowseToolbar />
      <DiskPanelModeBrowseList />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeBrowse)
