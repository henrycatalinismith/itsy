import React from "react"
import { connect } from "react-redux"
import Devtools from "@itsy.studio/studio/components/devtools"
import Header from "@itsy.studio/studio/components/header"
import SafeArea from "@itsy.studio/studio/components/safe-area"

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
  header: Header,
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeScreen)
