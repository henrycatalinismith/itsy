import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import Font from "@highvalley.systems/itsyexpo/components/font"
import {
  DiskPanelModes,
  selectDiskPanelMode,
  setDiskPanelMode,
} from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import styles from "./disk-panel-submode-create.module.scss"

interface DiskPanelSubmodeCreateProps {
  children: any
  setDiskPanelMode: (mode: DiskPanelModes) => void
  scrollable?: boolean
  style?: any
  title?: string
}

const mapStateToProps = (state) => ({
  mode: selectDiskPanelMode(state),
})

const mapDispatchToProps = {
  setDiskPanelMode,
}

export function DiskPanelSubmodeCreate({
  children,
  setDiskPanelMode,
  scrollable = true,
  style = undefined,
  title = "new disk",
}: DiskPanelSubmodeCreateProps) {
  const onCancel = React.useCallback(() => {
    setDiskPanelMode(DiskPanelModes.Browse)
  }, [])

  const Wrapper = scrollable ? ScrollView : View

  return (
    <View style={styles.component}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Font fontSize={32}>{title}</Font>
        </View>
        <View style={styles.headerButton}>
          <Button onPress={onCancel} theme={ButtonThemes.Red}>
            cancel
          </Button>
        </View>
      </View>
      <Wrapper style={[styles.children, style]}>
        {children}
        <View style={styles.spacer} />
      </Wrapper>
    </View>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiskPanelSubmodeCreate)
