import React from "react"

import styles from "./search.module.scss"

export function Search({ query, onChange, onEnter }): React.ReactElement {
  const element = React.useRef(undefined)
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onEnter()
    }
  }
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
      onKeyDown={onKeyDown}
    />
  )
}

export default Search
