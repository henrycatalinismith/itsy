import ToolboxPickerButtonBrush from "@highvalley.systems/itsydraw/components/toolbox-picker-button-brush"
import ToolboxPickerButtonCamera from "@highvalley.systems/itsydraw/components/toolbox-picker-button-camera"
import ToolboxPickerButtonPalette from "@highvalley.systems/itsydraw/components/toolbox-picker-button-palette"
import ToolboxPickerButtonSelect from "@highvalley.systems/itsydraw/components/toolbox-picker-button-clipboard"
import ToolboxPickerHighlight from "@highvalley.systems/itsydraw/components/toolbox-picker-highlight"
import {
  ToolboxLayouts,
  selectToolboxLayout,
} from "@highvalley.systems/itsydraw/store/toolbox"
import {
  Tool,
  ToolIds,
  selectRankedTools,
} from "@highvalley.systems/itsydraw/store/tools"
import cx from "classnames"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker.module.scss"

interface ToolboxPickerProps {
  layout: ToolboxLayouts
  tools: Tool[]
}

const mapStateToProps = (state) => ({
  layout: selectToolboxLayout(state),
  tools: selectRankedTools(state),
})

const mapDispatchToProps = {}

const buttonMap: { [key in ToolIds]: React.ReactElement } = {
  [ToolIds.Brush]: <ToolboxPickerButtonBrush />,
  [ToolIds.Camera]: <ToolboxPickerButtonCamera />,
  [ToolIds.Clipboard]: <ToolboxPickerButtonSelect />,
  [ToolIds.Palette]: <ToolboxPickerButtonPalette />,
}

export function ToolboxPicker({
  layout,
  tools,
}: ToolboxPickerProps): React.ReactElement {
  const className = cx(styles.component, styles[layout])
  return (
    <ol className={className}>
      <ToolboxPickerHighlight />
      {tools.map((tool) => {
        const gridArea = [1, tool.rank + 1, 1, tool.rank + 1].join(" / ")
        return (
          <li className={styles.item} key={tool.id} style={{ gridArea }}>
            {buttonMap[tool.id]}
          </li>
        )
      })}
    </ol>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPicker)
