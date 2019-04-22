import React from "react"
import Section from "./section"
import Type from "./type"
import styles from "../stylesheets/input.module.scss"

export default ({ children }) => {
  return (
    <Section title="parameters">
      <table className={styles.input}>
        <tbody>
          {children.map((arg, i) => (
            <tr key={arg.name}>
              <td className={styles.input__name}>
                {arg.name}
              </td>
              <td className={styles.input__type}>
                <Type name={arg.type} />
              </td>
              <td className={styles.input__desc}>
                {arg.desc}
                {arg.base && (
                  <>
                    <br />
                    <span className={styles.input__base}>
                      (default: {arg.base})
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