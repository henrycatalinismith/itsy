import React from "react"

import { FunctionOutput } from "@highvalley.systems/typedefs/manual"
import Section from "../section"
import Type from "../type"

import styles from "./output.module.scss"

export function Output(output: FunctionOutput): React.ReactElement {
  console.log(output)
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
