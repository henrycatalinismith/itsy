import React from "react"
import {
  Clipboard,
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  TextProps,
  ScrollViewProps,
} from "react-native"
import { Svg, Path } from "react-native-svg"
import { connect } from "react-redux"
import {
  clearOutput,
  selectActiveOutput,
} from "@highvalley.systems/itsyexpo/store/output"
import Button from "@highvalley.systems/itsyexpo/components/button"
import PlayerControls from "@highvalley.systems/itsyexpo/components/player-controls"
import colors from "@highvalley.systems/palettes/pico8/original.es6"
import styles from "./console.module.scss"

interface ConsoleProps {
  output: string[]
  clearOutput: () => void
}

const mapStateToProps = (state) => ({
  output: selectActiveOutput(state),
})

const mapDispatchToProps = {
  clearOutput,
}

export function Console({ clearOutput, output }: ConsoleProps) {
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
    <View style={styles.console}>
      <ScrollView style={styles.output} ref={view}>
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
      <View style={styles.shelf}>
        <PlayerControls />
        <Button onPress={clearOutput}>clear</Button>
      </View>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
