import React from "react"
import styles from "../stylesheets/page.module.scss"

export default ({ title, children }) => {
  return (
    <article className={styles.page}>
      <h1 className={styles.page__title}>
        {title}
      </h1>
      {children}
    </article>
  )
}