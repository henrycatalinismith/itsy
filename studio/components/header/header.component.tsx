import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import Floppy from "@itsy.studio/studio/components/floppy"
import Font from "@itsy.studio/studio/components/font"
import Storage from "@itsy.studio/studio/components/storage"

import styles from "./header.module.scss"

interface HeaderProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Header({}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Floppy />
      </View>
      <View style={styles.title}>
        <Font>itsy.studio</Font>
      </View>
      <View style={styles.storage}>
        <Storage />
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
