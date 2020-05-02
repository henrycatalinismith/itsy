import ToolboxPickerButtonBrush from "@highvalley.systems/itsydraw/components/toolbox-picker-button-brush"
import ToolboxPickerButtonCamera from "@highvalley.systems/itsydraw/components/toolbox-picker-button-camera"
import ToolboxPickerButtonSelect from "@highvalley.systems/itsydraw/components/toolbox-picker-button-select"
import {
  selectToolbox,
  ToolboxState,
  ToolboxToolIds,
} from "@highvalley.systems/itsydraw/store/toolbox"
import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker.module.scss"
import ToolboxPickerButton from "../toolbox-picker-button"

interface ToolboxPickerProps {
  toolbox: ToolboxState
}

const mapStateToProps = (state) => ({
  toolbox: selectToolbox(state),
})

const mapDispatchToProps = {}

const buttonMap: { [key in ToolboxToolIds]: React.ReactElement } = {
  [ToolboxToolIds.Brush]: <ToolboxPickerButtonBrush />,
  [ToolboxToolIds.Camera]: <ToolboxPickerButtonCamera />,
  [ToolboxToolIds.Select]: <ToolboxPickerButtonSelect />,
}

export function ToolboxPicker({
  toolbox,
}: ToolboxPickerProps): React.ReactElement {
  return (
    <ol className={styles.component}>
      {Object.keys(ToolboxToolIds).map((id) => {
        return (
          <li className={styles.item} key={id}>
            {buttonMap[id]}
          </li>
        )
      })}
    </ol>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolboxPicker)
