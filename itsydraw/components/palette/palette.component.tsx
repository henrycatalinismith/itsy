import Color from "@highvalley.systems/itsydraw/components/color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { Palette as PaletteState } from "@highvalley.systems/typedefs/itsy"
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
  const virtualSize = 128
  const browserSize = window.innerWidth / 2
  const scale = browserSize / virtualSize

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
                x={(parseInt(id, 10) % 4) * (128 / 4)}
                y={Math.floor(parseInt(id, 10) / 4) * (128 / 4)}
                size={128 / 4}
              />
            ))}
          </Layer>
        </Provider>
      </Stage>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette)
