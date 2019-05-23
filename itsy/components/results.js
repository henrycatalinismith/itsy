import React from "react"
import styles from "../stylesheets/results.module.scss"

export default ({ query, results }) => {
  return (
    <div className={styles.results}>
      {query === "" ? (
        <p>type a query</p>
      ) : results.length === 0 ? (
        <p>no results for {query}</p>
      ) : (
        <ul className={styles.results__list}>
          {results.map((page, i) => {
            return (
              <li key={`result-${i}`} className={styles.results__item}>
                <a href={page.frontMatter.path} className={styles.results__link}>
                  <div className={styles.results__title}>
                    {page.frontMatter.title}
                  </div>
                  <div className={styles.results__description}>
                    {page.frontMatter.description}
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}