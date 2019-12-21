import React from "react"
import styles from "./header.module.scss"

export function Header({ children, onClick }): React.ReactElement {
  return (
    <div className={styles.border}>
      <div className={styles.header} onClick={onClick}>
        {children}
      </div>
    </div>
  )
}

export default Header
