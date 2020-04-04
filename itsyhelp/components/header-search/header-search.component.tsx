import { search, selectQuery } from "@highvalley.systems/itsyhelp/store/query"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-search.module.scss"

export interface HeaderSearchProps {
  query: string
  search: (query: string) => void
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
})

const mapDispatchToProps = {
  search,
}

export function HeaderSearch({
  query,
  search,
}: HeaderSearchProps): React.ReactElement {
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
      className={styles.component}
      spellCheck={false}
      type="search"
      ref={element}
      value={query}
      onChange={() => search(element.current.value)}
      onKeyDown={onKeyDown}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)
