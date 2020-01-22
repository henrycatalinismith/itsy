import React from "react"
import { Text, ScrollView } from "react-native"
import { connect } from "react-redux"
import { selectOutput } from "@itsy.studio/studio/store/output"
import styles from "./console.module.scss"

interface ConsoleProps {
  output: string
}

const mapStateToProps = (state) => ({
  output: selectOutput(state),
})

const mapDispatchToProps = {}

export function Console({ output }: ConsoleProps) {
  const scrollView = React.useRef<ScrollView>()

  React.useEffect(() => {
    if (scrollView.current) {
      scrollView.current.scrollToEnd({
        animated: false,
      })
    }
  }, [output])

  return (
    <ScrollView style={styles.console} ref={scrollView}>
      <Text style={styles.text}>{output}</Text>
    </ScrollView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
