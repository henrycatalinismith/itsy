import React from "react"
import { connect } from "react-redux"

// import { currentPage, navigate } from "@itsy.studio/manual/store/location"

import Palette from "@itsy.studio/graphics/components/palette"
import Spritesheet from "@itsy.studio/graphics/components/spritesheet"

interface GraphicsProps {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function Graphics({}: GraphicsProps): React.ReactElement {
  return (
    <>
      <Palette />
      <Spritesheet />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphics)
