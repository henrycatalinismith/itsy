import { connect } from "react-redux"
import { Disk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { ScrollView } from "react-native"
import ConsoleOutputLine from "./console-output-line.component"
import styles from "./console-output.module.scss"

interface ConsoleOutputProps {
  disk: Disk
  output: string[]
}

const mapStateToProps = (state, ownProps) => ({
  output: state.output[ownProps.disk.id] || [],
})

const mapDispatchToProps = {}

export function ConsoleOutput({ disk, output }: ConsoleOutputProps) {
  const view = React.useRef<ScrollView>()
  const [selectedLine, setSelectedLine] = React.useState(-1)
  console.log(output)

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
        <ConsoleOutputLine
          key={i}
          text={line}
          selected={selectedLine === i}
          onSelect={() => setSelectedLine(i)}
          disk={disk}
        />
      ))}
    </ScrollView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleOutput)
