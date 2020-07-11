import DrawPanel from "@highvalley.systems/itsyexpo/components/draw-panel"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

interface DrawScreenProps {}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export function DrawScreen({}: DrawScreenProps) {
  return (
    <SafeArea>
      <DrawPanel />
    </SafeArea>
  )
}

DrawScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawScreen)
