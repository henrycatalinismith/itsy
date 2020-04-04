import PlayPanelConsoleOutputLine from "@highvalley.systems/itsyexpo/components/play-panel-console-output-line"
import { selectActiveOutput } from "@highvalley.systems/itsyexpo/store/output"
import React from "react"
import { ScrollView } from "react-native"
import { connect } from "react-redux"
import styles from "./play-panel-console-output.module.scss"

interface PlayPanelConsoleOutputProps {
  output: string[]
}

const mapStateToProps = (state) => ({
  output: selectActiveOutput(state),
})

const mapDispatchToProps = {}

export function PlayPanelConsoleOutput({
  output,
}: PlayPanelConsoleOutputProps) {
  const view = React.useRef<ScrollView>()
  const [selectedLine, setSelectedLine] = React.useState(-1)

  React.useEffect(() => {
    if (view.current) {
      view.current.scrollToEnd({
        animated: false,
      })
    }
  }, [output])

  return (
    <ScrollView style={styles.component} ref={view}>
      {output.map((line, i) => (
        <PlayPanelConsoleOutputLine
          key={i}
          text={line}
          selected={selectedLine === i}
          onSelect={() => setSelectedLine(i)}
        />
      ))}
    </ScrollView>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleOutput)
