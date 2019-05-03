import React from "react"
import marked from "marked"

import Text from "@highvalley.systems/spraypaint/components/text"
import Function from "./function"
import styles from "../stylesheets/page.module.scss"

export default ({ frontMatter, body }) => {
  console.log(frontMatter, body)
  return (
    <article className={styles.page}>


      {frontMatter.path.match(/^\/functions\/.+/) ? (

        <>
          <div className={styles.page__title}>
            <Text>
              {frontMatter.name}
            </Text>
          </div>
          <Function {...frontMatter} />
        </>

      ) : (

        <>
          <div className={styles.page__title}>
            <Text>
              {frontMatter.title}
            </Text>
          </div>
          <div
            className={styles.page__body}
            dangerouslySetInnerHTML={{ __html: marked(body) }}
          />
        </>

      )}

    </article>
  )
}

/*
export default ({ title, children }) => {
  return (
    <article className={styles.page}>
      <h1 className={styles.page__title}>
        {title}
      </h1>
      <div className={styles.page__body}>
        {children}
      </div>
    </article>
  )
}
*/