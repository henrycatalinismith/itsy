import React from "react"
import styles from "./function-description.module.scss"

export interface FunctionDescriptionProps {
  children: string
}

export function FunctionDescription({
  children,
}: FunctionDescriptionProps): React.ReactElement {
  return <p className={styles.component}>{children}</p>
}

export default FunctionDescription
