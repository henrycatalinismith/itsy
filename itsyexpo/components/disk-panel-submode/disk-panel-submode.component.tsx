import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-submode.module.scss"

interface DiskPanelSubmodeProps {
  children: any
  title: string
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelSubmode({ children, title }: DiskPanelSubmodeProps) {
  return (
    <View style={styles.component}>
      <View style={styles.title}>
        <Font fontSize={24}>{title}</Font>
      </View>
      <View style={styles.children}>{children}</View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelSubmode)
