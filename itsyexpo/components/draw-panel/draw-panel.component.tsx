import DrawPanelWebview from "@highvalley.systems/itsyexpo/components/draw-panel-webview"
import Loading from "@highvalley.systems/itsyexpo/components/loading"
import {
  Disk,
  selectActiveDisk,
} from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import styles from "./draw-panel.module.scss"

interface DrawPanelProps {
  disk: Disk
}

const mapStateToProps = (state) => ({
  disk: selectActiveDisk(state),
})

const mapDispatchToProps = {}

export function DrawPanel({ disk }: DrawPanelProps) {
  const renders = React.useRef(0)
  const [loading, setLoading] = React.useState(true)
  const [reloading, setReloading] = React.useState(false)

  const onLoadWebview = React.useCallback(() => setLoading(false), [])

  React.useEffect(() => {
    if (renders.current > 1) {
      setLoading(true)
      setReloading(true)
      setTimeout(() => setReloading(false), Math.pow(2, 8))
    }
  }, [disk.id])

  renders.current += 1

  return React.useMemo(
    () => (
      <View style={styles.drawPanel}>
        {!reloading && <DrawPanelWebview onLoad={onLoadWebview} />}
        {(loading || reloading) && <Loading style={styles.loading} />}
      </View>
    ),
    [loading, reloading]
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanel)
