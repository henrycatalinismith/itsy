import Color from "@highvalley.systems/itsydraw/components/color"
import { selectZoom, zoomTo } from "@highvalley.systems/itsydraw/store/zoom"
import React from "react"
import { connect } from "react-redux"
import styles from "./zoom.module.scss"

interface ZoomProps {
  zoom: number
  zoomTo: (z: number) => void
}

const mapStateToProps = (state) => ({
  zoom: selectZoom(state),
})

const mapDispatchToProps = {
  zoomTo,
}

export function Zoom({ zoom, zoomTo }: ZoomProps): React.ReactElement {
  const onChange = React.useCallback((event: any) => {
    const value = parseInt(event.target.value, 10)
    const newZoom = value + 1
    zoomTo(newZoom)
  }, [])

  const input: React.HTMLProps<HTMLInputElement> = {
    className: styles.range,
    type: "range",
    min: 0,
    max: 3,
    value: zoom - 1,
    onChange,
  }

  return (
    <div className={styles.zoom}>
      <input {...input} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Zoom)
