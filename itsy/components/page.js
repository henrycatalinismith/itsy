import React from "react"
import Text from "@highvalley.systems/spraypaint/components/text"
import styles from "../stylesheets/page.module.scss"

export default ({ title, children}) => {
  return (
    <article className={styles.page}>
      <div className={styles.page__title}>
        <Text fontSize={32}>
          {title}
        </Text>
      </div>
      <div className={styles.page__body}>
        {children}
      </div>
    </article>
  )
}
