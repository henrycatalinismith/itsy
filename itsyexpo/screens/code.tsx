import Devtools from "@highvalley.systems/itsyexpo/components/devtools"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"
import React from "react"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export function CodeScreen({}) {
  return (
    <SafeArea>
      <Devtools />
    </SafeArea>
  )
}

CodeScreen.navigationOptions = {
  header: <></>,
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen)
