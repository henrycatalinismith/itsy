import React from "react"

import styles from "./signature.module.scss"

export function Signature({ name, args }): React.ReactElement {
  return (
    <section className={styles.signature}>
      {name}(
      {(args || []).map((arg, i) => (
        <span key={i}>
          {" "}
          {arg.base ? (
            <span className={styles.signature__name}>[{arg.name}]</span>
          ) : (
            <span className={styles.signature__name}>{arg.name}</span>
          )}
          {i < args.length - 1 && <span>,</span>}
        </span>
      ))}{" "}
      )
    </section>
  )
}

export default Signature
