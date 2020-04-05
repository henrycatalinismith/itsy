import HeaderBreadcrumbList from "@highvalley.systems/itsyhelp/components/header-breadcrumb-list"
import HeaderSearch from "@highvalley.systems/itsyhelp/components/header-search"
import { selectCurrentPage } from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./header.module.scss"

export interface HeaderProps {
  page: HelpPage
}

const mapStateToProps = (state) => ({
  page: selectCurrentPage(state),
})

const mapDispatchToProps = {}

export function Header({ page }: HeaderProps): React.ReactElement {
  return (
    <header className={styles.component}>
      {page.path.match(/^\/search$/) ? (
        <HeaderSearch />
      ) : (
        <HeaderBreadcrumbList />
      )}
    </header>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
