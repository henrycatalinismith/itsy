import { selectSpritesheetPng } from "@highvalley.systems/itsydraw/store/spritesheet"
import { selectClipboardRect } from "@highvalley.systems/itsydraw/store/tools"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./clipboard-settings.module.scss"

interface ClipboardSettingsProps {
  clipboardRect: Rect
  spritesheetPng: string
}

const mapStateToProps = (state) => ({
  clipboardRect: selectClipboardRect(state),
  spritesheetPng: selectSpritesheetPng(state),
})

const mapDispatchToProps = {}

export function ClipboardSettings({
  clipboardRect,
  spritesheetPng,
}: ClipboardSettingsProps): React.ReactElement {
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
    x: 0,
    y: 0,
    width: 128,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardSettings)
