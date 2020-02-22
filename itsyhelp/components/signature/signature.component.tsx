import React from "react"

import styles from "./signature.module.scss"

import { Function } from "@itsy.studio/types/manual"

export function Signature(fn: Function): React.ReactElement {
  return (
    <section className={styles.signature}>
      {fn.name}(
      {fn.input.map((arg, i) => (
        <span key={i}>
          {" "}
          {arg.default ? (
            <span className={styles.signature__name}>[{arg.name}]</span>
          ) : (
            <span className={styles.signature__name}>{arg.name}</span>
          )}
          {i < fn.input.length - 1 && <span>,</span>}
        </span>
      ))}{" "}
      )
    </section>
  )
}

export default Signature
