import Button from "@highvalley.systems/itsyexpo/components/button"
import React from "react"
import { Clipboard, Text, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"
import styles from "./console-output-line.module.scss"

interface ConsoleOutputLineProps {
  onSelect: () => void
  selected: boolean
  text: string
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export function ConsoleOutputLine({
  onSelect,
  selected,
  text,
}: ConsoleOutputLineProps) {
  const onCopy = React.useCallback(() => {
    Clipboard.setString(text)
  }, [])

  const lineProps = {
    style: styles.component,
    onPress: onSelect,
  }

  const textProps = {
    style: [styles.text],
  }

  if (selected) {
    textProps.style.push(styles.selected)
  }

  return (
    <TouchableHighlight {...lineProps}>
      <>
        <Text {...textProps}>{text}</Text>
        {selected && (
          <View style={styles.copy}>
            <Button action={onCopy}>copy</Button>
          </View>
        )}
      </>
    </TouchableHighlight>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleOutputLine)
