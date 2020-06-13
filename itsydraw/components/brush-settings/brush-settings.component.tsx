import BrushIcon from "@highvalley.systems/itsydraw/components/brush-icon"
import ModePicker, {
  ModePickerItems,
} from "@highvalley.systems/itsydraw/components/mode-picker"
import {
  BrushModes,
  BrushSizes,
  LineAngles,
  CircleStyles,
  selectActiveBrushMode,
  handleBrushModeTap,
  selectCircleBrushStyle,
  selectLineBrushAngle,
  selectBrushColor,
  selectBrushSize,
} from "@highvalley.systems/itsydraw/store/tools"
import Pixlflip from "@highvalley.systems/pixlflip/regular"
import { PaletteColor } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"

interface ToolboxToolBrushProps {
  brushMode: BrushModes
  brushSize: BrushSizes
  brushColor: PaletteColor
  circleStyle: CircleStyles
  lineAngle: LineAngles
  handleBrushModeTap?: (mode: BrushModes) => void
}

const mapStateToProps = (state) => ({
  brushMode: selectActiveBrushMode(state),
  brushColor: selectBrushColor(state),
  brushSize: selectBrushSize(state),
  circleStyle: selectCircleBrushStyle(state),
  lineAngle: selectLineBrushAngle(state),
})

const mapDispatchToProps = {
  handleBrushModeTap,
}

export function ToolboxToolBrush({
  brushMode,
  brushColor,
  brushSize,
  circleStyle,
  lineAngle,
  handleBrushModeTap,
}: ToolboxToolBrushProps): React.ReactElement {
  const modes: ModePickerItems = {}

  modes[BrushModes.Pencil] = {
    active: brushMode === BrushModes.Pencil,
    icon: (
      <BrushIcon
        brush={{
          id: BrushModes.Pencil,
          color: brushColor.id,
          size: brushSize,
        }}
      />
    ),
    label: "Pencil",
    meta: <Pixlflip fontSize={16}>{`${brushSize}x`}</Pixlflip>,
    rank: 0,
  }

  modes[BrushModes.Line] = {
    active: brushMode === BrushModes.Line,
    icon: (
      <BrushIcon
        brush={{
          id: BrushModes.Line,
          color: brushColor.id,
          size: brushSize,
          angle: lineAngle,
        }}
      />
    ),
    label: "Line",
    meta: <Pixlflip fontSize={16}>{lineAngle}</Pixlflip>,
    rank: 1,
  }

  modes[BrushModes.Circle] = {
    active: brushMode === BrushModes.Circle,
    icon: (
      <BrushIcon
        brush={{
          id: BrushModes.Circle,
          color: brushColor.id,
          size: brushSize,
          style: circleStyle,
        }}
      />
    ),
    label: "Circle",
    meta: <Pixlflip fontSize={16}>{circleStyle}</Pixlflip>,
    rank: 2,
  }

  modes[BrushModes.Fill] = {
    active: brushMode === BrushModes.Fill,
    icon: (
      <BrushIcon
        brush={{
          id: BrushModes.Fill,
          color: brushColor.id,
        }}
      />
    ),
    label: "Fill",
    meta: <></>,
    rank: 3,
  }

  modes[BrushModes.Paste] = {
    active: brushMode === BrushModes.Paste,
    icon: <BrushIcon brush={{ id: BrushModes.Paste }} />,
    label: "Paste",
    meta: <></>,
    rank: 4,
  }

  const onTouch = React.useCallback((mode: BrushModes) => {
    handleBrushModeTap(mode)
  }, [])

  const modePicker = { modes, onTouch }

  return <ModePicker {...modePicker} />
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxToolBrush)
