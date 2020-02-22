import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import DiskIcon from "@highvalley.systems/itsyexpo/components/disk-icon"
import Floppy from "@highvalley.systems/itsyexpo/components/floppy"
import Font from "@highvalley.systems/itsyexpo/components/font"
import Storage from "@highvalley.systems/itsyexpo/components/storage"
import {
  Disk,
  DiskType,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"

import styles from "./header.module.scss"

interface HeaderProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function Header({ disk }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        {disk.type === DiskType.empty ? (
          <Floppy />
        ) : (
          <DiskIcon id={disk.id} size={24} />
        )}
      </View>
      <View style={styles.title}>
        {disk.type === DiskType.empty ? (
          <Font>itsy.studio</Font>
        ) : (
          <Font>{disk.name}</Font>
        )}
      </View>
      <View style={styles.storage}>
        <Storage />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
