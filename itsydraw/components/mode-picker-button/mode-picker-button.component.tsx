import Pixlflip from "@highvalley.systems/pixlflip/regular"
import cx from "classnames"
import React from "react"
import styles from "./mode-picker-button.module.scss"

export interface ModePickerButtonProps {
  id: string
  position: number
  active: boolean
  icon: React.ReactElement
  label: string
  meta: React.ReactElement
  onTap: (id: string) => void
}

export function ModePickerButton({
  id,
  position,
  active,
  icon,
  label,
  meta,
  onTap,
}: ModePickerButtonProps): React.ReactElement {
  const className = cx(styles.component, {
    [styles.active]: active,
  })

  const onClick = React.useCallback(() => onTap(id), [])

  const gridArea = [position + 1, 1, position + 1, 1].join(" / ")
  const style = { gridArea }

  const button: React.HTMLAttributes<HTMLButtonElement> = {
    className,
    onClick,
    style,
  }

  return (
    <button {...button}>
      <div className={styles.layout}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.label}>
          <Pixlflip fontSize={24}>{label}</Pixlflip>
        </div>
        <div className={styles.meta}>{meta}</div>
      </div>
    </button>
  )
}

export default ModePickerButton
