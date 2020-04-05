import cx from "classnames"
import React from "react"
import styles from "./section.module.scss"

export interface SectionProps {
  children: any
  title: string
  className?: string
}

export function Section({
  children,
  title,
  className = undefined,
}): React.ReactElement {
  return (
    <section className={cx(styles.component, className)}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
}

export default Section
