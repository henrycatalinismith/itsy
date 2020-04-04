import FunctionExampleListItem from "@highvalley.systems/itsyhelp/components/function-example-list-item"
import { FunctionExample } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import Section from "../section"
import styles from "./function-example-list.module.scss"

interface FunctionExampleListProps {
  examples: FunctionExample[]
}

export function FunctionExampleList({
  examples,
}: FunctionExampleListProps): React.ReactElement {
  return (
    <Section title="examples">
      {examples.map((example, i) => (
        <FunctionExampleListItem key={i} {...example} />
      ))}
    </Section>
  )
}

export default FunctionExampleList
