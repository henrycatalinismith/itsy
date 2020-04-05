import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./search-result-list-item.module.scss"

interface SearchResultListItemProps {
  result: HelpPage
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function SearchResultListItem({
  result,
}: SearchResultListItemProps): React.ReactElement {
  return (
    <li className={styles.component}>
      <a href={result.path} className={styles.link}>
        <div className={styles.title}>{result.title}</div>
        <div className={styles.description}>{result.description}</div>
      </a>
    </li>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultListItem)
