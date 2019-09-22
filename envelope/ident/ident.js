import React from "react"
import Svg from "@highvalley.systems/logotype/svg"
import Wordmark from "@highvalley.systems/logotype/wordmark"
import styles from "./ident.module.scss"

export default function Ident() {
  return (
    <Svg width={512} height={512} className={styles.svg}>
      <Wordmark />
    </Svg>
  )
}
