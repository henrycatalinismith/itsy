import _ from "lodash"
import React from "react"
import { Stage, Layer, Rect } from "react-konva"
import { ReactReduxContext, Provider } from "react-redux"
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
  const { store } = React.useContext(ReactReduxContext)
  const size = window.innerWidth
  const scale = (window.innerWidth / 128) * 2

  return (
    <Stage width={size} height={size}>
      <Provider store={store}>
        <Layer scale={{ x: scale, y: scale }}>
          {Object.entries(spritesheet).map(([x, column]) => (
            <>
              {Object.entries(column).map(([y, pixel]) => {
                const onMouseEnter = React.useCallback(() => {
                  drawPixel(x, y)
                }, [])
                return (
                  <Rect
                    key={`${x}-${y}`}
                    x={parseInt(x.toString(), 10)}
                    y={parseInt(y.toString(), 10)}
                    width={1}
                    height={1}
                    fill={palette[pixel].hex}
                    onMouseEnter={onMouseEnter}
                  />
                )
              })}
            </>
          ))}
        </Layer>
      </Provider>
    </Stage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
