import React from "react"
import { connect } from "react-redux"
import styles from "./results.module.scss"

import { Page } from "@itsy.studio/types/manual"
import {
  selectQuery,
  selectResults,
} from "@highvalley.systems/itsyhelp/store/query"

interface ResultsProps {
  query: string
  results: Page[]
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
  results: selectResults(state),
})

const mapDispatchToProps = {}

export function Results({ query, results }: ResultsProps): React.ReactElement {
  return (
    <div className={styles.results}>
      {query === "" ? (
        <p>type a query</p>
      ) : results.length === 0 ? (
        <p>no results for {query}</p>
      ) : (
        <ul className={styles.results__list}>
          {results.map((page, i) => {
            return (
              <li key={`result-${i}`} className={styles.results__item}>
                <a href={page.path} className={styles.results__link}>
                  <div className={styles.results__title}>{page.title}</div>
                  <div className={styles.results__description}>
                    {page.description}
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
