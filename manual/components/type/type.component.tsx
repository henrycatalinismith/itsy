import React from "react"

import styles from "./type.module.scss"

export function Type({ name }): React.ReactElement {
  return (
    <span className={styles.type}>
      <span className={styles.type__lt}>&lt;</span>
      <span className={styles.type__name}>{name}</span>
      <span className={styles.type__gt}>&gt;</span>
    </span>
  )
}

export default Type