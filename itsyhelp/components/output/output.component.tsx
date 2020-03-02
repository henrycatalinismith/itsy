import { FunctionOutput } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import Section from "../section"
import Type from "../type"
import styles from "./output.module.scss"

export function Output(output: FunctionOutput): React.ReactElement {
  return (
    <Section
      title={
        <>
          returns{" "}
          <span className={styles.output__type}>
            <Type name={output.type} />
          </span>
        </>
      }
    >
      <p className={styles.output__description}>{output.desc}</p>
    </Section>
  )
}

export default Output
