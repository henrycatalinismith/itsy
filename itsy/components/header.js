import React from "react"
import styles from "../stylesheets/header.module.scss"

export default ({ path }) => {
  let prev = ""

  const breadcrumbs = [
    {
      text: "home",
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

  console.log(breadcrumbs)

  return (
    <div className={styles.header}>
      <ul className={styles.breadcrumbs}>
        {breadcrumbs.map((segment, i) => (
          <li className={styles.breadcrumb} key={`breadcrumb-${i}`}>
            <a className={styles.breadcrumbLink} href={segment.href}>
              {segment.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
