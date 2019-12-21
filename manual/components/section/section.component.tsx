import React from "react"

import styles from "./section.module.scss"

export function Section({ title, children }): React.ReactElement {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__heading}>{title}</h2>
      {children}
    </section>
  )
}

export default Section
