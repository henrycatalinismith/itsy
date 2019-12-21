import React from "react"
import styles from "./square.module.scss"

export function Square({ children, bg }): React.ReactElement {
  return (
    <div className={styles.sizeLimit}>
      <div className={styles.aspectRatio}>
        <div className={styles.square}>{children}</div>
      </div>
    </div>
  )
}

export default Square
