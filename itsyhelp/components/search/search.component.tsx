import React from "react"
import { connect } from "react-redux"

import { selectQuery, search } from "@highvalley.systems/itsyhelp/store/query"
import styles from "./search.module.scss"

interface SearchProps {
  query: string
  search: (query: string) => void
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
})

const mapDispatchToProps = {
  search,
}

export function Search({ query, search }): React.ReactElement {
  const element = React.useRef(undefined)
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      // onEnter()
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
      onChange={() => search(element.current.value)}
      onKeyDown={onKeyDown}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
