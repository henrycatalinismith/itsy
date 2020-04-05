import { selectQuery } from "@highvalley.systems/itsyhelp/store/query"
import React from "react"
import { connect } from "react-redux"
import styles from "./search-empty-state.module.scss"

interface SearchEmptyStateProps {
  query: string
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
})

const mapDispatchToProps = {}

export function SearchEmptyState({
  query,
}: SearchEmptyStateProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <p className={styles.message}>no results for {query}</p>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchEmptyState)
