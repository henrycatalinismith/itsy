import React from "react"
import styles from "../stylesheets/signature.module.scss"

export default ({ name, args }) => {
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
          {(i < args.length - 1) && <span>,</span>}
        </span>
       ))}{" "})
    </section>
  )
}