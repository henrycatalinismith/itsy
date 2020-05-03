import ToolboxPickerButtonBrush from "@highvalley.systems/itsydraw/components/toolbox-picker-button-brush"
import ToolboxPickerButtonCamera from "@highvalley.systems/itsydraw/components/toolbox-picker-button-camera"
import ToolboxPickerButtonPalette from "@highvalley.systems/itsydraw/components/toolbox-picker-button-palette"
import ToolboxPickerButtonSelect from "@highvalley.systems/itsydraw/components/toolbox-picker-button-select"
import {
  Tool,
  ToolIds,
  selectRankedTools,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker.module.scss"

interface ToolboxPickerProps {
  tools: Tool[]
}

const mapStateToProps = (state) => ({
  tools: selectRankedTools(state),
})

const mapDispatchToProps = {}

const buttonMap: { [key in ToolIds]: React.ReactElement } = {
  [ToolIds.Brush]: <ToolboxPickerButtonBrush />,
  [ToolIds.Camera]: <ToolboxPickerButtonCamera />,
  [ToolIds.Palette]: <ToolboxPickerButtonPalette />,
  [ToolIds.Select]: <ToolboxPickerButtonSelect />,
}

export function ToolboxPicker({
  tools,
}: ToolboxPickerProps): React.ReactElement {
  return (
    <ol className={styles.component}>
      {tools.map((tool) => {
        return (
          <li className={styles.item} key={tool.id}>
            {buttonMap[tool.id]}
          </li>
        )
      })}
    </ol>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPicker)
