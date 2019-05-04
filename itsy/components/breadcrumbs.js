import React from "react"
import styles from "../stylesheets/breadcrumbs.module.scss"

export default ({ path }) => {
  let prev = ""

  const breadcrumbs = [
    {
      text: "itsy",
      href: "/",
    },
    ...path.split(/\//).filter(segment => !!segment).map(segment => {
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
