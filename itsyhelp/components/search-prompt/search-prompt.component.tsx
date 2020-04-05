import React from "react"
import { connect } from "react-redux"
import styles from "./search-prompt.module.scss"

interface SearchPromptProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function SearchPrompt({}: SearchPromptProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <p>type a query</p>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPrompt)
