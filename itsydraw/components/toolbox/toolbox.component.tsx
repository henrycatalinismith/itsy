import {
  selectZoom,
  zoomCamera,
} from "@highvalley.systems/itsydraw/store/camera"
import Navigator from "@highvalley.systems/itsydraw/components/navigator"
import Palette from "@highvalley.systems/itsydraw/components/palette"
import Zoom from "@highvalley.systems/itsydraw/components/zoom"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox.module.scss"

interface ToolboxProps {
  // zoom: number
  // zoomCamera: (z: number) => void
}

const mapStateToProps = (state) => ({
  // zoom: selectZoom(state),
})

const mapDispatchToProps = {
  // zoomCamera,
}

export function Toolbox({}: ToolboxProps): React.ReactElement {
  return (
    <div className={styles.toolbox}>
      <div className={styles.palette}>
        <Palette />
      </div>
      <div className={styles.navigator}>
        <Navigator />
      </div>
      <div className={styles.zoom}>
        <Zoom />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
