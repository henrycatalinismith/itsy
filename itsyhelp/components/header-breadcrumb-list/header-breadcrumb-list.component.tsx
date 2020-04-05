import HeaderBreadcrumbListDivider from "@highvalley.systems/itsyhelp/components/header-breadcrumb-list-divider"
import HeaderBreadcrumbListItem from "@highvalley.systems/itsyhelp/components/header-breadcrumb-list-item"
import { selectCurrentPage } from "@highvalley.systems/itsyhelp/store/location"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-breadcrumb-list.module.scss"

interface HeaderBreadcrumbListProps {
  page: HelpPage
}

const mapStateToProps = (state) => ({
  page: selectCurrentPage(state),
})

const mapDispatchToProps = {}

export function HeaderBreadcrumbList({
  page,
}: HeaderBreadcrumbListProps): React.ReactElement {
  let prev = ""

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
    <div className={styles.component}>
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
