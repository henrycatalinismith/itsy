import HeaderBreadcrumbListDivider from "@highvalley.systems/itsyhelp/components/header-breadcrumb-list-divider"
import HeaderBreadcrumbListItem from "@highvalley.systems/itsyhelp/components/header-breadcrumb-list-item"
import {
  navigate,
  selectCurrentPage,
} from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-breadcrumb-list.module.scss"

interface HeaderBreadcrumbListProps {
  page: HelpPage
  navigate: (path: string) => void
}

const mapStateToProps = (state) => ({
  page: selectCurrentPage(state),
})

const mapDispatchToProps = {
  navigate,
}

export function HeaderBreadcrumbList({
  navigate,
  page,
}: HeaderBreadcrumbListProps): React.ReactElement {
  let prev = ""

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

  const breadcrumbs = [
    {
      text: "home",
      href: "/",
    },
    ...page.path
      .split(/\//)
      .filter((segment) => !!segment)
      .map((segment) => {
        const href = `${prev}/${segment}`
        prev = href
        return {
          text: segment,
          href,
        }
      }),
  ]

  return (
    <div className={styles.component} onClick={onClick}>
      <ul className={styles.items}>
        {breadcrumbs.map((segment, i) => (
          <>
            <HeaderBreadcrumbListItem key={i} href={segment.href}>
              {segment.text}
            </HeaderBreadcrumbListItem>
            {i < breadcrumbs.length - 1 && <HeaderBreadcrumbListDivider />}
          </>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBreadcrumbList)
