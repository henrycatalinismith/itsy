import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import { selectClipboardRect } from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./toolbox-tool-clipboard-rect.module.scss"

interface ToolboxToolClipboardRectProps {
  clipboardRect: Rect
  spritesheetPng: string
}

const mapStateToProps = (state) => ({
  clipboardRect: selectClipboardRect(state),
  spritesheetPng: selectSpritesheetPng(state),
})

const mapDispatchToProps = {}

export function ToolboxToolClipboardRect({
  clipboardRect,
  spritesheetPng,
}: ToolboxToolClipboardRectProps): React.ReactElement {
  const viewBox = [
    clipboardRect.x,
    clipboardRect.y,
    clipboardRect.width,
    clipboardRect.height,
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

  return (
    <div className={styles.component}>
      <svg {...svg}>
        <defs>
          <clipPath id="clipboard">
            <rect {...clip} />
          </clipPath>
        </defs>
        <image {...image} />
      </svg>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolClipboardRect)
