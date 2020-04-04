import Button from "@highvalley.systems/itsyexpo/components/button"
import { clearOutput } from "@highvalley.systems/itsyexpo/store/output"
import React from "react"
import { connect } from "react-redux"

interface PlayPanelConsoleToolbarClearProps {
  clearOutput: () => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  clearOutput,
}

export function PlayPanelConsoleToolbarClear({
  clearOutput,
}: PlayPanelConsoleToolbarClearProps) {
  return <Button onPress={clearOutput}>clear</Button>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleToolbarClear)
