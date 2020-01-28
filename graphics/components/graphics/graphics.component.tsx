import React from "react"
import { connect } from "react-redux"

// import { currentPage, navigate } from "@itsy.studio/manual/store/location"

import Palette from "@itsy.studio/graphics/components/palette"

interface GraphicsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Graphics({}: GraphicsProps): React.ReactElement {
  return (
    <>
      <Palette />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics)
