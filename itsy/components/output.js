import React from "react"
import Section from "./section"
import Type from "./type"
import styles from "../stylesheets/output.module.scss"

export default ({ type, desc }) => {
  return (
    <Section title={(
      <>
        returns
        {" "}
        <span className={styles.output__type}>
          <Type name={type} />
        </span>
      </>
    )}>
      <p className={styles.output__description}>
        {desc}
      </p>
    </Section>
  )
}