import Button from "@highvalley.systems/itsyexpo/components/button"
import { selectActiveOutput } from "@highvalley.systems/itsyexpo/store/output"
import React from "react"
import {
  Clipboard,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native"
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

  console.log(output)

  const onLinePress = (i: number) => () => setSelectedLine(i)

  const onCopy = React.useCallback(() => {
    Clipboard.setString(output[selectedLine])
  }, [])

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
        <TouchableHighlight key={i} onPress={onLinePress(i)}>
          <>
            <Text
              style={[
                styles.lineText,
                i === selectedLine && styles.selectedLineText,
              ]}
            >
              {line}
            </Text>
            {i === selectedLine && (
              <View style={styles.copy}>
                <Button onPress={onCopy}>copy</Button>
              </View>
            )}
          </>
        </TouchableHighlight>
      ))}
    </ScrollView>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPanelConsoleOutput)
