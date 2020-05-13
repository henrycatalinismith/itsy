import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import ToolboxPickerButton from "@highvalley.systems/itsydraw/components/toolbox-picker-button"
import {
  selectClipboardRect,
  ToolIds,
} from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import pico8 from "@highvalley.systems/palettes/pico8"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-picker-button-clipboard.module.scss"

interface ToolboxPickerButtonClipboardProps {
  clipboardRect: Rect
  spritesheetPng: string
}

const mapStateToProps = (state) => ({
  clipboardRect: selectClipboardRect(state),
  spritesheetPng: selectSpritesheetPng(state),
})

const mapDispatchToProps = {}

export function ToolboxPickerButtonClipboard({
  clipboardRect,
  spritesheetPng,
}: ToolboxPickerButtonClipboardProps): React.ReactElement {
  const viewBox = [
    clipboardRect.x - 8,
    clipboardRect.y - 8,
    clipboardRect.width + 16,
    clipboardRect.height + 16,
  ].join(" ")

  const svg: React.SVGAttributes<SVGElement> = {
    className: styles.svg,
    viewBox,
  }

  const clip: React.SVGAttributes<SVGRectElement> = {
    className: styles.clip,
    id: "clipboard",
    ...clipboardRect,
  }

  const image: React.SVGAttributes<SVGImageElement> = {
    className: styles.image,
    href: `data:image/png;base64,${spritesheetPng}`,
    height: 128,
    clipPath: "url(#clipboard)",
  }

  const outline: React.SVGAttributes<SVGRectElement> = {
    x: clipboardRect.x - 4,
    y: clipboardRect.y - 4,
    width: clipboardRect.width + 4,
    height: clipboardRect.height + 4,
    fill: "none",
    stroke: pico8[14],
    strokeDasharray: Math.max(clipboardRect.width, clipboardRect.height) / 16,
    strokeWidth: Math.max(clipboardRect.width, clipboardRect.height) / 16,
  }

  return (
    <ToolboxPickerButton id={ToolIds.Clipboard}>
      <svg {...svg}>
        <defs>
          <clipPath id="clipboard">
            <rect {...clip} />
          </clipPath>
        </defs>
        <image {...image} />
        <rect {...outline} />
      </svg>
    </ToolboxPickerButton>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxPickerButtonClipboard)
