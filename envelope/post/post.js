import React from "react"
import styles from "./post.module.scss"

export default function Post({
  title = "",
  children = <></>,
}) {
  return (
    <article className={styles.layout}>
      <div className={styles.content}>

        <h2 className={styles.title}>
          {title}
        </h2>

        {typeof children === "string" ? (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: children }}
          />
        ) : (
          <div className={styles.body}>
            {children}
          </div>
        )}

      </div>
    </article>
  )
}
