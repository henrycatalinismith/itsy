import FunctionInputListItem from "@highvalley.systems/itsyhelp/components/function-input-list-item"
import { FunctionParameter } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import Section from "../section"
import styles from "./function-input-list.module.scss"

interface FunctionInputListProps {
  parameters: FunctionParameter[]
}

export function FunctionInputList({
  parameters,
}: FunctionInputListProps): React.ReactElement {
  return (
    <Section title="parameters">
      <table className={styles.component}>
        <tbody>
          {parameters.map((arg, i) => (
            <FunctionInputListItem key={i} {...arg} />
          ))}
        </tbody>
      </table>
    </Section>
  )
}

export default FunctionInputList
