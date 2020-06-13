import {
  BrushModes,
  BrushSizes,
  CircleBrushState,
  FillBrushState,
  LineBrushState,
  PasteBrushState,
  PencilBrushState,
  selectPalette,
} from "@highvalley.systems/itsydraw/store/tools"
import { Palette } from "@highvalley.systems/typedefs/itsy"
import React from "react"
import { connect } from "react-redux"
import styles from "./brush-icon.module.scss"

interface BrushIconProps {
  brush:
    | CircleBrushState
    | FillBrushState
    | LineBrushState
    | PasteBrushState
    | PencilBrushState
  palette: Palette
}

const brushSizeStrokeWidths: { [key in BrushSizes]: number } = {
  1: 4,
  2: 8,
  4: 12,
  8: 16,
}

const circlePoints = [
  [64, 24],
  [24, 64],
  [64, 104],
  [104, 64],
]

const mapStateToProps = (state) => ({
  palette: selectPalette(state),
})

export function BrushIcon({
  brush,
  palette,
}: BrushIconProps): React.ReactElement {
  return (
    <svg
      className={styles.component}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 128 128"
      width="100%"
      height="100%"
    >
      {brush.id === BrushModes.Circle && (
        <>
          <circle className={styles.circle} cx={64} cy={64} r={40} />
          {circlePoints.map((p, i) => (
            <circle
              key={i}
              className={styles.circlePoint}
              cx={p[0]}
              cy={p[1]}
              r={10}
            />
          ))}
        </>
      )}

      {brush.id === BrushModes.Fill && (
        <>
          <defs>
            <mask id="paintMask">
              <polygon
                fill="#fff"
                opacity={1}
                points="16,80 80,80 80,16"
                transform="rotate(45deg)"
              />
            </mask>
          </defs>
          <g transform="translate(10, 10)">
            <rect
              className={styles.fillBucket}
              x={16}
              y={16}
              width={64}
              height={64}
            />
            <rect
              className={styles.fillPaint}
              x={16}
              y={16}
              width={64}
              height={64}
              fill={palette[brush.color].hex}
              mask="url(#paintMask)"
            />
            <ellipse
              className={styles.fillDroplet}
              cx={112}
              cy={80}
              rx={8}
              ry={11}
              fill={palette[brush.color].hex}
            />
          </g>
        </>
      )}

      {brush.id === BrushModes.Line && (
        <>
          <path className={styles.line} d="M32,96 L96,32" />
          <circle className={styles.linePoint} cx={32} cy={96} r={16} />
          <circle className={styles.linePoint} cx={96} cy={32} r={16} />
        </>
      )}

      {brush.id === BrushModes.Paste && (
        <g transform="translate(10, 10)">
          <ellipse
            className={styles.pasteHandleShadow}
            cx={64}
            cy={32}
            rx={16}
            ry={24}
          />
          <ellipse
            className={styles.pasteHandle}
            cx={64}
            cy={32}
            rx={16}
            ry={24}
          />
          <rect
            className={styles.pasteStampShadow}
            x={32}
            y={64}
            width={64}
            height={16}
          />
          <rect
            className={styles.pasteShaft}
            x={60}
            y={32}
            width={8}
            height={32}
          />
          <rect
            className={styles.pasteStamp}
            x={32}
            y={64}
            width={64}
            height={16}
          />
        </g>
      )}

      {brush.id === BrushModes.Pencil && (
        <g transform="translate(10, 10)">
          <path
            className={styles.pencil}
            d="M13 64l-2 2L1 90a7 7 0 009 9l24-10 2-1 48-48 1-1 1-1 12-12c3-3 3-8 0-11L85 2a7 7 0 00-10 0L13 64zm17 9l-3-3 43-43 3 3-43 43z"
          />
          <path
            d="M28,72 72,28"
            stroke={palette[brush.color].hex}
            strokeWidth={brushSizeStrokeWidths[brush.size]}
          />
          <path
            d="M28,72 72,28"
            stroke="#000"
            strokeWidth={brushSizeStrokeWidths[brush.size] + 4}
          />
        </g>
      )}
    </svg>
  )
}

export default connect(mapStateToProps)(BrushIcon)
