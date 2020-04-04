import { FunctionParameter } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import Type from "../type"
import styles from "./function-input-list-item.module.scss"

export function FunctionInputListItem(
  arg: FunctionParameter
): React.ReactElement {
  return (
    <tr>
      <td className={styles.name}>{arg.name}</td>
      <td className={styles.type}>
        <Type name={arg.type} />
      </td>
      <td className={styles.desc}>
        {arg.desc}
        {arg.default && (
          <>
            <br />
            <span className={styles.default}>(default: {arg.default})</span>
          </>
        )}
      </td>
    </tr>
  )
}

export default FunctionInputListItem
