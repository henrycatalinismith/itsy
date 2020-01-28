import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import {
  PaletteIndex,
  PaletteState,
  selectPalette,
} from "@itsy.studio/graphics/store/palette"
import {
  SpritesheetPixelIndex,
  SpritesheetState,
  drawPixel,
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  palette: PaletteState
  spritesheet: SpritesheetState
  drawPixel: (x: SpritesheetPixelIndex, y: SpritesheetPixelIndex) => void
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {
  drawPixel,
}

export function Spritesheet({
  palette,
  spritesheet,
  drawPixel,
}: SpritesheetProps): React.ReactElement {
  const scale = 4
  const ref = React.useRef<HTMLCanvasElement>()

  const onMouseMove = React.useCallback((event: MouseEvent) => {
    const rect = ref.current.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / scale)
    const y = Math.floor((event.clientY - rect.top) / scale)
    drawPixel(x as SpritesheetPixelIndex, y as SpritesheetPixelIndex)
  }, [])

  const props: any = {
    ref,
    onMouseMove,
  }

  React.useEffect(() => {
    if (!ref.current) {
      return
    }

    const ctx = ref.current.getContext("2d")
    Object.entries(spritesheet).map(([x, column]) => {
      Object.entries(column).map(([y, pixel]) => {
        const color = palette[pixel].hex
        ctx.fillStyle = color
        ctx.fillRect(
          parseInt(x.toString(), 10) * scale,
          parseInt(y.toString(), 10) * scale,
          1 * scale,
          1 * scale
        )
      })
    })
  })

  return <canvas {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
