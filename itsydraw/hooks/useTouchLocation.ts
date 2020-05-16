import ScreenContext from "@highvalley.systems/itsydraw/components/screen/screen.context"
import { Point, Rect } from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import React from "react"

export default function useTouchLocation(
  canvas: HTMLCanvasElement,
  camera: Rect
) {
  return function(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement>
  ): Point {
    const canvasRect = canvas.getBoundingClientRect()

    const pointer = event.type.startsWith("touch")
      ? (event as React.TouchEvent).touches[0]
      : (event as React.MouseEvent)
    const canvasX = pointer.clientX - canvasRect.left
    const canvasY = pointer.clientY - canvasRect.top

    const scale = 1 / (canvasRect.width / camera.width)
    const scaledX = Math.round(scale * canvasX)
    const scaledY = Math.round(scale * canvasY)

    const clampedX = _.clamp(
      scaledX + camera.x,
      camera.x,
      camera.x + camera.width
    )
    const clampedY = _.clamp(
      scaledY + camera.y,
      camera.y,
      camera.y + camera.height
    )

    const x = clampedX
    const y = clampedY

    return { x, y }
  }
}
