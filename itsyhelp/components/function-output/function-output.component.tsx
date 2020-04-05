import { FunctionOutput as Output } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import Section from "../section"
import Type from "../type"
import styles from "./function-output.module.scss"

export function FunctionOutput(output: Output): React.ReactElement {
  const title = (
    <>
      returns{" "}
      <span className={styles.output__type}>
        <Type name={output.type} />
      </span>
    </>
  )

  return (
    <Section title={title} className={styles.component}>
      {output.desc && <p className={styles.description}>{output.desc}</p>}
    </Section>
  )
}

export default FunctionOutput
