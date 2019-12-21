import React from "react"

import Section from "../section"
import Type from "../type"

import styles from "./output.module.scss"

export function Output({ type, desc }): React.ReactElement {
  return (
    <Section
      title={
        <>
          returns{" "}
          <span className={styles.output__type}>
            <Type name={type} />
          </span>
        </>
      }
    >
      <p className={styles.output__description}>{desc}</p>
    </Section>
  )
}

export default Output
