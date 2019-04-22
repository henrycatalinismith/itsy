import React from "react"
import styles from "../stylesheets/output.module.scss"

export default ({ type, desc }) => {
  return (
    <section className={styles.output}>
      <h2 className={styles.output__heading}>
        returns
        {" "}
        {type}
      </h2>
      <p className={styles.output__description}>
        {desc}
      </p>
    </section>
  )
}