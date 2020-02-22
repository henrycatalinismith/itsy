import React from "react"

import { Page, Function } from "@highvalley.systems/typedefs/manual"

import Section from "../section"
import Signature from "../signature"
import Input from "../input"
import Output from "../output"
import Example from "../example"

import styles from "./function.module.scss"

interface FunctionProps {
  page: Page
}

export function FunctionPage({ page }: FunctionProps): React.ReactElement {
  return (
    <>
      <Signature {...page.function} />
      <p className={styles.function__desc}>{page.description}</p>
      <Input parameters={page.function.input} />
      <Output {...page.function.output} />
      <Section title="examples">
        {Object.entries(page.function.examples).map(([name, example]) => (
          <Example key={name} {...example} />
        ))}
      </Section>
    </>
  )
}

export default FunctionPage
