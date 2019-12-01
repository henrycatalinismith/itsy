import React from "react"
import styles from "../styles/square.module.scss"

export default ({ children, bg }) => {
  return (
    <div className={styles.sizeLimit}>
      <div className={styles.aspectRatio}>
        <div className={styles.square}>
          {children}
        </div>
      </div>
    </div>
  )
}
