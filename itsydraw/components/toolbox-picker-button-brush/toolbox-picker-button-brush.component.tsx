import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { ToolboxToolIds } from "@highvalley.systems/itsydraw/store/toolbox"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-brush.module.scss"

interface ToolboxPickerButtonBrushProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxPickerButtonBrush({}: ToolboxPickerButtonBrushProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 32 32",
  }

  const brush: React.SVGAttributes<SVGPathElement> = {
    className: styles.path,
    d:
      "M167 309c-40 3-77 18-97 73-3 6-8 10-15 10-11 0-45-28-55-35 0 83 38 155 128 155 76 0 128-44 128-120l-1-9-88-74zM458 0c-15 0-29 7-40 16-205 183-226 187-226 241 0 14 3 27 9 39l64 53c7 2 14 3 22 3 62 0 98-45 211-256 7-15 14-30 14-46 0-29-26-50-54-50z",
  }

  return (
    <ToolboxPickerButton id={ToolboxToolIds.Brush}>
      <svg {...svg}>
        <g transform="scale(0.04) translate(160 128)">
          <path {...brush} />
        </g>
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonBrush)
