import SearchEmptyState from "@highvalley.systems/itsyhelp/components/search-empty-state"
import SearchPrompt from "@highvalley.systems/itsyhelp/components/search-prompt"
import SearchResultList from "@highvalley.systems/itsyhelp/components/search-result-list"
import {
  selectQuery,
  selectResults,
} from "@highvalley.systems/itsyhelp/store/query"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./search.module.scss"

interface SearchProps {
  query: string
  results: HelpPage[]
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
  results: selectResults(state),
})

const mapDispatchToProps = {}

export function Search({ query, results }: SearchProps): React.ReactElement {
  return (
    <div className={styles.component}>
      {query === "" ? (
        <SearchPrompt />
      ) : results.length === 0 ? (
        <SearchEmptyState />
      ) : (
        <SearchResultList />
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
