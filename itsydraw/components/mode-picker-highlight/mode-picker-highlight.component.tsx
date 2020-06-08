import cx from "classnames"
import React from "react"
import { connect } from "react-redux"
import styles from "./mode-picker-highlight.module.scss"

interface ModePickerHighlightProps {
  position: number
}

export function ModePickerHighlight({
  position,
}: ModePickerHighlightProps): React.ReactElement {
  const className = cx(styles.component)

  const gridArea = [1, 1, 1, 1].join(" / ")
  const transform = `translateY(${position * 100}%)`
  const style = { gridArea, transform }

  const div: React.HTMLAttributes<HTMLDivElement> = {
    className,
    style,
    "aria-hidden": true,
  }

  return <div {...div} />
}

export default ModePickerHighlight
