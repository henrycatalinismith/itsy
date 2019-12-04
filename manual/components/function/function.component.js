import React from "react"

import Section from "../section"
import Signature from "../signature"
import Input from "../input"
import Output from "../output"
import Example from "../example"

import styles from "./function.module.scss"

export default ({
  title = "",
  description = "",
  path = "",
  type = "",
  args, 
  examples, 
  returns,
}) => {
  return (
    <>
      <Signature name={title} args={args} />

      <p className={styles.function__desc}>
        {description}
      </p>

      {args && <Input>{args}</Input>}
      {returns && <Output {...returns} />}

      <Section title="examples">
        {Object.entries(examples).map(([id, code]) => (
          <Example key={id} id={id} code={code} />
        ))}
      </Section>
    </>
  )
}
