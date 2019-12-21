import React from "react"

import { FunctionParameter } from "@itsy.studio/types/manual"
import Section from "../section"
import Type from "../type"

import styles from "./input.module.scss"

interface InputProps {
  parameters: FunctionParameter[]
}

export function Input({ parameters }: InputProps): React.ReactElement {
  return (
    <Section title="parameters">
      <table className={styles.input}>
        <tbody>
          {parameters.map((arg, i) => (
            <tr key={arg.name}>
              <td className={styles.input__name}>{arg.name}</td>
              <td className={styles.input__type}>
                <Type name={arg.type} />
              </td>
              <td className={styles.input__desc}>
                {arg.desc}
                {arg.default && (
                  <>
                    <br />
                    <span className={styles.input__base}>
                      (default: {arg.default})
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  )
}

export default Input
