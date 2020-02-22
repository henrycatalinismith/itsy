import React from "react"
import { connect } from "react-redux"
import Devtools from "@highvalley.systems/itsyexpo/components/devtools"
import Header from "@highvalley.systems/itsyexpo/components/header"
import SafeArea from "@highvalley.systems/itsyexpo/components/safe-area"

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
