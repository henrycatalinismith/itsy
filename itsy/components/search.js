import React from "react"
import styles from "../stylesheets/search.module.scss"

export default ({ }) => {
  return (
    <input
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      autoFocus
      className={styles.search}
      spellCheck={false}
      type="search"
    />
  )
}
