import React from "react"
import Pixlflip from "@highvalley.systems/pixlflip/regular"

import styles from "./page.module.scss"

export function Page({ title, children }): React.ReactElement {
  return (
    <article className={styles.page}>
      <div className={styles.page__title}>
        <Pixlflip fontSize={32}>{title}</Pixlflip>
      </div>
      <div className={styles.page__body}>{children}</div>
    </article>
  )
}

export default Page
