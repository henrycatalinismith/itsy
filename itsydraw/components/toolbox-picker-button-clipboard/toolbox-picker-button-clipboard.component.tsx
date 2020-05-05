import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import { ToolIds } from "@highvalley.systems/itsydraw/store/tools"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-clipboard.module.scss"

interface ToolboxPickerButtonClipboardProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ToolboxPickerButtonClipboard({}: ToolboxPickerButtonClipboardProps): React.ReactElement {
  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.component,
    viewBox: "0 0 32 32",
  }

  const selection: React.SVGAttributes<SVGPathElement> = {
    className: styles.selection,
    d: "M4,4 L28,4 L28,28 L4,28 L4,4",
  }

  return (
    <ToolboxPickerButton id={ToolIds.Clipboard}>
      <svg {...svg}>
        <path {...selection} />
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonClipboard)
