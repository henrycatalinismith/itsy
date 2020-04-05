import React from "react"
import { connect } from "react-redux"
import styles from "./header-breadcrumb-list-divider.module.scss"

interface HeaderBreadcrumbListDividerProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function HeaderBreadcrumbListDivider({}: HeaderBreadcrumbListDividerProps): React.ReactElement {
  return <li className={styles.component}>/</li>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBreadcrumbListDivider)
