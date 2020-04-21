import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import DiskPanelSubmodeCreate from "@highvalley.systems/itsyexpo/components/disk-panel-submode-create"
import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { connect } from "react-redux"
import styles from "./disk-panel-mode-template.module.scss"

interface DiskPanelModeTemplateProps {}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {}

export function DiskPanelModeTemplate({}: DiskPanelModeTemplateProps) {
  return (
    <DiskPanelSubmodeCreate style={styles.component}>
      <Font fontSize={24}>choose template</Font>
    </DiskPanelSubmodeCreate>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelModeTemplate)
