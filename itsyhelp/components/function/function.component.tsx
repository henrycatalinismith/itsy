import FunctionDescription from "@highvalley.systems/itsyhelp/components/function-description"
import FunctionExampleList from "@highvalley.systems/itsyhelp/components/function-example-list"
import FunctionInputList from "@highvalley.systems/itsyhelp/components/function-input-list"
import FunctionOutput from "@highvalley.systems/itsyhelp/components/function-output"
import FunctionSignature from "@highvalley.systems/itsyhelp/components/function-signature"
import { HelpPage } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import styles from "./function.module.scss"

interface FunctionProps {
  page: HelpPage
}

export function Function({ page }: FunctionProps): React.ReactElement {
  return (
    <div className={styles.component}>
      <FunctionSignature {...page.function} />
      <FunctionDescription>{page.description}</FunctionDescription>
      <FunctionInputList parameters={page.function.input} />
      <FunctionOutput {...page.function.output} />
      <FunctionExampleList examples={page.function.examples} />
    </div>
  )
}

export default Function
