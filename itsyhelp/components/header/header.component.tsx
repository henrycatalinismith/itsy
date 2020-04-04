import HeaderBreadcrumbs from "@highvalley.systems/itsyhelp/components/header-breadcrumbs"
import HeaderSearch from "@highvalley.systems/itsyhelp/components/header-search"
import {
  navigate,
  selectCurrentPage,
} from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./header.module.scss"

export interface HeaderProps {
  page: HelpPage
  navigate: (path: string) => void
}

const mapStateToProps = (state) => ({
  page: selectCurrentPage(state),
})

const mapDispatchToProps = {
  navigate,
}

export function Header({ navigate, page }: HeaderProps): React.ReactElement {
  const onClick = React.useCallback(
    (event) => {
      const link = event.target.closest("a")
      if (link) {
        return
      }
      event.preventDefault()
      navigate("/search")
    },
    [page.path]
  )

  return (
    <div className={styles.border}>
      <div className={styles.header} onClick={onClick}>
        {page.path.match(/^\/search$/) ? (
          <HeaderSearch />
        ) : (
          <HeaderBreadcrumbs />
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
