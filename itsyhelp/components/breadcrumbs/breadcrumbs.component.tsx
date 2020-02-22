import React from "react"
import { connect } from "react-redux"

import { currentPage } from "@highvalley.systems/itsyhelp/store/location"
import { Page } from "@itsy.studio/types/manual"
import styles from "./breadcrumbs.module.scss"

interface BreadcrumbsProps {
  page: Page
}

const mapStateToProps = (state) => ({
  page: currentPage(state),
})

const mapDispatchToProps = {}

export function Breadcrumbs({ page }: BreadcrumbsProps): React.ReactElement {
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
    <ul className={styles.breadcrumbs}>
      {breadcrumbs.map((segment, i) => (
        <li className={styles.breadcrumb} key={`breadcrumb-${i}`}>
          <a className={styles.breadcrumbLink} href={segment.href}>
            {segment.text}
          </a>
          {i < breadcrumbs.length - 1 && (
            <span className={styles.slash}>/</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs)
