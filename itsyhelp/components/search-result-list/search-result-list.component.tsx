import SearchResultListItem from "@highvalley.systems/itsyhelp/components/search-result-list-item"
import { selectResults } from "@highvalley.systems/itsyhelp/store/query"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./search-result-list.module.scss"

interface SearchResultListProps {
  results: HelpPage[]
}

const mapStateToProps = (state) => ({
  results: selectResults(state),
})

const mapDispatchToProps = {}

export function SearchResultList({
  results,
}: SearchResultListProps): React.ReactElement {
  return (
    <ul className={styles.component}>
      {results.map((result, i) => {
        return <SearchResultListItem key={i} result={result} />
      })}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultList)
