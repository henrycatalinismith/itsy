import _ from "lodash"
import ModePickerButton, {
  ModePickerButtonProps,
} from "@highvalley.systems/itsydraw/components/mode-picker-button"
import ModePickerHighlight from "@highvalley.systems/itsydraw/components/mode-picker-highlight"
import React from "react"
import styles from "./mode-picker.module.scss"

export interface ModePickerItem {
  active: boolean
  icon: React.ReactElement
  label: string
  meta: React.ReactElement
  rank: number
}

export interface ModePickerItems {
  [id: string]: ModePickerItem
}

export interface ModePickerProps {
  modes: ModePickerItems
  onTouch: (id: string) => void
}

export function ModePicker({
  modes,
  onTouch,
}: ModePickerProps): React.ReactElement {
  const activeMode = _.find(modes, "active")
  const activePosition = activeMode?.rank || 0
  return (
    <div className={styles.component}>
      <ModePickerHighlight position={activePosition} />
      {_.toPairs(modes).map(([id, mode], i) => {
        const button: ModePickerButtonProps = {
          id,
          position: mode.rank,
          active: mode.active,
          icon: mode.icon,
          label: mode.label,
          meta: mode.meta,
          onTap: (id: string) => onTouch(id),
        }

        return <ModePickerButton {...button} />
      })}
    </div>
  )
}

export default ModePicker
