import ScreenContext from "@highvalley.systems/itsydraw/components/screen/screen.context"
import {
  changeBrushColor,
  selectBrushColor,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import {
  Palette,
  PaletteColor,
  PaletteIndex,
} from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import React from "react"
import { Layer, Stage } from "react-konva"
import { RectConfig } from "konva/types/shapes/Rect"
import { Rect } from "react-konva"
import { connect, Provider, ReactReduxContext } from "react-redux"
import styles from "./screen-palette.module.scss"

interface ScreenPaletteProps {
  brushColor: PaletteColor
  palette: Palette
  changeBrushColor: (i: PaletteIndex) => void
}

const mapStateToProps = (state) => ({
  brushColor: selectBrushColor(state),
  palette: selectPalette(state),
})

const mapDispatchToProps = {
  changeBrushColor,
}

export function ScreenPalette({
  brushColor,
  changeBrushColor,
  palette,
}: ScreenPaletteProps): React.ReactElement {
  const { rect } = React.useContext(ScreenContext)
  const { store } = React.useContext(ReactReduxContext)

  const min = Math.min(rect.width, rect.height)

  const colorSize = 128 / 4
  const virtualSize = 128
  const browserSize = min + 4
  const scale = browserSize / virtualSize

  return (
    <Stage
      className={styles.component}
      width={browserSize}
      height={browserSize}
      scaleX={scale}
      scaleY={scale}
    >
      <Provider store={store}>
        <Layer>
          {_.toPairs(palette).map(([id, color]) => {
            const active = brushColor.id === parseInt(id.toString(), 10)
            const activate = React.useCallback(() => {
              changeBrushColor(id)
            }, [])

            const x = (parseInt(id, 10) % 4) * colorSize
            const y = Math.floor(parseInt(id, 10) / 4) * colorSize

            const props: RectConfig = {
              x,
              y,
              width: colorSize,
              height: colorSize,
              fill: color.hex,
              onClick: activate,
              onTap: activate,
              onTouchStart: activate,
            }

            const rect = <Rect {...props} />

            if (active) {
              return (
                <>
                  {rect}
                  <Rect
                    x={x + 0}
                    y={y + 0}
                    width={colorSize - 1}
                    height={colorSize - 1}
                    stroke="white"
                    strokeWidth={2}
                    lineJoin="round"
                  />
                  <Rect
                    x={x + 2}
                    y={y + 2}
                    width={colorSize - 5}
                    height={colorSize - 5}
                    stroke="black"
                    strokeWidth={2}
                    lineJoin="round"
                  />
                </>
              )
            }

            return rect
          })}
        </Layer>
      </Provider>
    </Stage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenPalette)
