import React from "react"
import styles from "./header.module.scss"

export default ({ children, onClick }) => {
  return (
    <div className={styles.border}>
      <div className={styles.header} onClick={onClick}>
        {children}
      </div>
    </div>
  )
}
