import ToolboxToolPencilPaletteColor from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil-palette-color"
import { selectPalette } from "@highvalley.systems/itsydraw/store/palette"
import { Palette, PaletteIndex } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect, Provider, ReactReduxContext } from "react-redux"
import { Stage, Layer, Rect, Text } from "react-konva"
import styles from "./toolbox-tool-pencil-color.module.scss"

interface ToolboxToolPencilPaletteProps {
  palette: Palette
}

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

const mapDispatchToProps = {}

export function ToolboxToolPencilPalette({
  palette,
}: ToolboxToolPencilPaletteProps): React.ReactElement {
  const { store } = React.useContext(ReactReduxContext)

  const colorSize = 128 / 4
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
              <ToolboxToolPencilPaletteColor
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolPencilPalette)
