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
import { connect } from "react-redux"
import { selectOutput } from "@itsy.studio/studio/store/output"
import Button from "@itsy.studio/studio/components/button"
import styles from "./console.module.scss"

interface ConsoleProps {
  output: string[]
}

const mapStateToProps = (state) => ({
  output: selectOutput(state),
})

const mapDispatchToProps = {}

export function Console({ output }: ConsoleProps) {
  const view = React.useRef<ScrollView>()
  const [selectedLine, setSelectedLine] = React.useState(-1)

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

  const scrollView: ScrollViewProps = {
    style: styles.console,
  }

  return (
    <ScrollView {...scrollView} ref={view}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Console)
