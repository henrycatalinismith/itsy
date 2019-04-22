import React from "react"
import Example from "./example"
import styles from "../stylesheets/examples.module.scss"

export default ({ children }) => {
  return (
    <section className={styles.examples}>
      <h2 className={styles.examples__heading}>
        examples
      </h2>
         
      {Object.entries(children).map(([id, code]) => (
        <Example key={id} id={id} code={code} />
      ))}
    </section>
  )
}