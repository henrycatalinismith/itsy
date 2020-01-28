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
  selectSpritesheet,
} from "@itsy.studio/graphics/store/spritesheet"
import Pixel from "@itsy.studio/graphics/components/pixel"
import styles from "./spritesheet.module.scss"

interface SpritesheetProps {
  palette: PaletteState
  spritesheet: SpritesheetState
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
  spritesheet: selectSpritesheet(state),
})

const mapDispatchToProps = {}

export function Spritesheet({
  palette,
  spritesheet,
}: SpritesheetProps): React.ReactElement {
  const { store } = React.useContext(ReactReduxContext)
  const size = window.innerWidth
  const scale = (window.innerWidth / 128) * 2

  const chunkSize = 4
  const chunkCount = 128 / chunkSize

  return (
    <Stage width={size} height={size}>
      <Provider store={store}>
        <Layer scale={{ x: scale, y: scale }}>
          {Object.entries(spritesheet).map(([x, column]) => (
            <>
              {_.range(0, chunkCount).map((chunkIndex) => (
                <>
                  {React.useMemo(
                    () => (
                      <>
                        {console.log(`${chunkIndex}`)}
                        {Object.entries(column)
                          .slice(
                            chunkIndex * chunkSize,
                            (chunkIndex + 1) * chunkSize
                          )
                          .map(([y, pixel]) => (
                            <Pixel
                              key={`${x}-${y}`}
                              x={x}
                              y={y}
                              color={palette[pixel].hex}
                            />
                          ))}
                      </>
                    ),
                    _.values(column).slice(
                      chunkIndex * chunkSize,
                      (chunkIndex + 1) * chunkSize
                    )
                  )}
                </>
              ))}
            </>
          ))}
        </Layer>
      </Provider>
    </Stage>
  )

  /*
  return (
    <Stage width={size} height={size}>
      <Provider store={store}>
        <Layer scale={{ x: scale, y: scale }}>
          {Object.entries(spritesheet).map(([x, column]) => (
            <>
              {Object.entries(column).map(([y, pixel]) => (
                <Pixel key={`${x}-${y}`} x={x} y={y} color={palette[pixel].hex} />
              ))}
            </>
          ))}
        </Layer>
      </Provider>
    </Stage>
  )
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(Spritesheet)
