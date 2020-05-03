import ToolboxToolPencilPaletteColor from "@highvalley.systems/itsydraw/components/toolbox-tool-pencil-palette-color"
import ToolboxToolContext from "@highvalley.systems/itsydraw/components/toolbox-tool/toolbox-tool.context"
import { selectPalette } from "@highvalley.systems/itsydraw/store/tools"
import { Palette } from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import React from "react"
import { Layer, Stage } from "react-konva"
import { connect, Provider, ReactReduxContext } from "react-redux"
import styles from "./toolbox-tool-pencil-palette.module.scss"

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
  const { rect } = React.useContext(ToolboxToolContext)
  const { store } = React.useContext(ReactReduxContext)

  const min = Math.min(rect.width, rect.height)

  const colorSize = 128 / 4
  const virtualSize = 128
  const browserSize = min - 8
  const scale = browserSize / virtualSize

  return (
    <Stage
      className={styles.palette}
      width={browserSize}
      height={browserSize}
      scaleX={scale}
      scaleY={scale}
    >
      <Provider store={store}>
        <Layer>
          {_.toPairs(palette).map(([id, color]) => (
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
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolboxToolPencilPalette)
