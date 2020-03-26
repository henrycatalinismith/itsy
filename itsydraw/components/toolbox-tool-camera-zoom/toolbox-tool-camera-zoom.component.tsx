import cx from "classnames"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import {
  selectZoom,
  zoomCamera,
} from "@highvalley.systems/itsydraw/store/camera"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-camera-zoom.module.scss"

interface ToolboxToolCameraZoomProps {
  zoom: number
  zoomCamera: (z: number) => void
}

const mapStateToProps = (state) => ({
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  zoomCamera,
}

const zoomLevels = [1, 2, 4, 8]

export function ToolboxToolCameraZoom({
  zoom,
  zoomCamera,
}: ToolboxToolCameraZoomProps): React.ReactElement {
  return (
    <div className={styles.zooms}>
      {zoomLevels.map((z) => {
        const className = cx(styles.zoom, {
          [styles.active]: z === zoom,
        })

        const onClick = React.useCallback(() => {
          zoomCamera(z)
        }, [])

        const button: React.HTMLAttributes<HTMLButtonElement> = {
          className,
          onClick,
        }

        return (
          <button key={z} {...button}>
            <Pixlflip fontSize={16}>{`${z.toString()}x`}</Pixlflip>
          </button>
        )
      })}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolCameraZoom)
