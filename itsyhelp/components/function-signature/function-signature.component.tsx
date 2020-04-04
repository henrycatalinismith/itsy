import { Function } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import styles from "./function-signature.module.scss"

export function Signature(fn: Function): React.ReactElement {
  return (
    <section className={styles.component}>
      {fn.name}(
      {fn.input.map((arg, i) => (
        <span key={i}>
          {" "}
          {arg.default ? (
            <span className={styles.name}>[{arg.name}]</span>
          ) : (
            <span className={styles.name}>{arg.name}</span>
          )}
          {i < fn.input.length - 1 && <span>,</span>}
        </span>
      ))}{" "}
      )
    </section>
  )
}

export default Signature
