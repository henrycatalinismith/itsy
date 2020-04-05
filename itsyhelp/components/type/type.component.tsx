import React from "react"
import styles from "./type.module.scss"

export interface TypeProps {
  name: string
}

export function Type({ name }: TypeProps): React.ReactElement {
  return (
    <span className={styles.component}>
      <span className={styles.lt}>&lt;</span>
      <span className={styles.name}>{name}</span>
      <span className={styles.gt}>&gt;</span>
    </span>
  )
}

export default Type
