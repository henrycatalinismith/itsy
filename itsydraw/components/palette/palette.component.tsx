import Color from "@highvalley.systems/itsydraw/components/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import {
  Palette as PaletteState,
  PaletteIndex,
} from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect, Provider, ReactReduxContext } from "react-redux"
import { Stage, Layer, Rect, Text } from "react-konva"
import styles from "./palette.module.scss"

interface PaletteProps {
  palette: PaletteState
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function Palette({ palette }: PaletteProps): React.ReactElement {
  const { store } = React.useContext(ReactReduxContext)

  const colorSize = 128 / 4
  const virtualSize = 128
  const browserSize = window.innerWidth / 2
  const scale = browserSize / virtualSize

  // x={(parseInt(id, 10) % 4) * (128 / 4)}
  // y={Math.floor(parseInt(id, 10) / 4) * (128 / 4)}

  // x={p[id][0] * colorSize}
  // y={p[id][1] * colorSize}

  /*
  const p: { [k: number]: [number,number] } = {
    0: [0,0],
    1: [1,0],
    2: [2,0],
    3: [3,0],
    4: [4,0],
    5: [0,1],
    6: [0,2],
    7: [0,3],
    8: [0,4],
    9: [1,4],
    10: [2,4],
    11: [3,4],
    12: [4,4],
    13: [5,4],
    14: [5,3],
    15: [5,2],
  }
  */

  return (
    <>
      <Stage
        width={browserSize}
        height={browserSize}
        scaleX={scale}
        scaleY={scale}
      >
        <Provider store={store}>
          <Layer>
            {Object.entries(palette).map(([id, color]) => (
              <Color
                key={id}
                id={id}
                x={(parseInt(id, 10) % 4) * colorSize}
                y={Math.floor(parseInt(id, 10) / 4) * colorSize}
                size={colorSize}
              />
            ))}
          </Layer>
        </Provider>
      </Stage>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette)
