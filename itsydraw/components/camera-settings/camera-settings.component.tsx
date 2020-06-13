import CameraIcon from "@highvalley.systems/itsydraw/components/camera-icon"
import ModePicker, {
  ModePickerItems,
} from "@highvalley.systems/itsydraw/components/mode-picker"
import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import {
  applyZoom,
  selectCamera,
  selectZoom,
  zoomCamera,
} from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"

interface CameraSettingsProps {
  camera: Rect
  spritesheet: string
  zoom: number
  zoomCamera: (z: number) => void
}

const mapStateToProps = (state) => ({
  camera: selectCamera(state),
  spritesheet: selectSpritesheetPng(state),
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  zoomCamera,
}

const zoomLevels = [1, 2, 4, 8]

export function CameraSettings({
  camera,
  spritesheet,
  zoom,
  zoomCamera,
}: CameraSettingsProps): React.ReactElement {
  const modes: ModePickerItems = {}

  zoomLevels.forEach((level, i) => {
    modes[level] = {
      active: zoom === level,
      icon: (
        <CameraIcon
          camera={applyZoom(camera, level)}
          spritesheet={spritesheet}
        />
      ),
      label: `x${level} zoom`,
      meta: <></>,
      rank: i,
    }
  })

  const onTouch = React.useCallback((level: string) => {
    zoomCamera(parseInt(level, 10))
  }, [])

  const modePicker = { modes, onTouch }

  return <ModePicker {...modePicker} />
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraSettings)
