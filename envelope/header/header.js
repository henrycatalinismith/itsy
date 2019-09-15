import React from "react"
import styles from "./header.module.scss"

export default function Header({ children = <></> }) {
  return (
    <div className={styles.background}>
      <div className={styles.foreground}>
        {children}
      </div>
    </div>
  )
}
