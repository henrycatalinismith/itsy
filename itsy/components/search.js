import React from "react"
import styles from "../stylesheets/search.module.scss"

export default ({ query, onChange }) => {
  const element = React.useRef(undefined)
  return (
    <input
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      autoFocus
      className={styles.search}
      spellCheck={false}
      type="search"
      ref={element}
      value={query}
      onChange={() => onChange(element.current.value)}
    />
  )
}
