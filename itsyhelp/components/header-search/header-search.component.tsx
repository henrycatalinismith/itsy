import HeaderSearchExit from "@highvalley.systems/itsyhelp/components/header-search-exit"
import HeaderSearchInput from "@highvalley.systems/itsyhelp/components/header-search-input"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-search.module.scss"

export interface HeaderSearchProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function HeaderSearch({}: HeaderSearchProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <HeaderSearchInput />
      <HeaderSearchExit />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)
