import React from "react"
import { connect } from "react-redux"
import styles from "./header-breadcrumb-list-item.module.scss"

interface HeaderBreadcrumbListItemProps {
  children: string
  href: string
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function HeaderBreadcrumbListItem({
  children,
  href,
}: HeaderBreadcrumbListItemProps): React.ReactElement {
  return (
    <li className={styles.component}>
      <a className={styles.link} href={href}>
        {children}
      </a>
    </li>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBreadcrumbListItem)
