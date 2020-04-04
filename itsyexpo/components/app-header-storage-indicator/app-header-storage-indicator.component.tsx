import { selectStorageBusy } from "@highvalley.systems/itsyexpo/store/storage"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./app-header-storage-indicator.module.scss"

interface AppHeaderStorageIndicatorProps {
  busy: boolean
}

const mapStateToProps = (state) => ({
  busy: selectStorageBusy(state),
})

const mapDispatchToProps = {}

export function AppHeaderStorageIndicator({
  busy,
}: AppHeaderStorageIndicatorProps): React.ReactElement {
  const style = [styles.component]

  if (busy) {
    style.push(styles.busy)
  } else {
    style.push(styles.idle)
  }

  return <View style={style} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeaderStorageIndicator)
