import Font from "@highvalley.systems/itsyexpo/components/font"
import { TouchableOpacity } from "react-native"
import React from "react"
import styles from "./back.module.scss"

export interface BackProps {
  onPress: () => void
}

export function Back({ onPress }: BackProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} style={styles.component}>
      <Font fontSize={24}>{"<"}</Font>
    </TouchableOpacity>
  )
}

export default Back
