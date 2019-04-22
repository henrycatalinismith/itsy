import React from "react"
import Page from "./page"
import Section from "./section"
import Signature from "./signature"
import Input from "./input"
import Output from "./output"
import Example from "./example"
import styles from "../stylesheets/function.module.scss"

export default ({
  content = "",
  data: {
    name = "",
    desc = "",
    path = "",
    type = "",
    args, 
    examples, 
    returns,
  }
}) => {
  return (
    <Page title={name}>
      <Signature name={name} args={args} />

      <p className={styles.function__desc}>
        {desc}
      </p>

      {args && <Input>{args}</Input>}
      {returns && <Output {...returns} />}

      <Section title="examples">
        {Object.entries(examples).map(([id, code]) => (
          <Example key={id} id={id} code={code} />
        ))}
      </Section>
    </Page>
  )
}