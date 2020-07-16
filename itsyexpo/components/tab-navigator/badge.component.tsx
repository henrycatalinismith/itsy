import Font from "@highvalley.systems/itsyexpo/components/font"
import React from "react"
import { View } from "react-native"

export interface BadgeProps {
  label: string
  width: number
}

export function Badge({ label, width }: BadgeProps) {
  const style: any = {}
  style.position = "absolute"
  style.right = width / 4
  style.top = 5

  return (
    <View style={style}>
      <Font fontSize={18}>{label}</Font>
    </View>
  )
}

export default Badge
