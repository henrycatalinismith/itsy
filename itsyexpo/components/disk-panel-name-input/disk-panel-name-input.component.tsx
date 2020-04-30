import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import React from "react"
import { TextInput, View } from "react-native"
import styles from "./disk-panel-name-input.module.scss"

export interface DiskPanelNameInputProps {
  name: string
  onSubmit: (name: string) => void
  onCancel: () => void
}

export function DiskPanelNameInput(props: DiskPanelNameInputProps) {
  const [name, setName] = React.useState(props.name)

  const onChange = React.useCallback((newName) => {
    setName(newName)
  }, [])

  const onCancel = React.useCallback(() => {
    props.onCancel()
  }, [name])

  const onSubmit = React.useCallback(() => {
    props.onSubmit(name)
  }, [name])

  return (
    <View style={styles.component}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
        textContentType="none"
        value={name}
      />
      <View style={styles.buttons}>
        <View style={styles.save}>
          <Button action={onSubmit} theme={ButtonThemes.Blue}>
            save
          </Button>
        </View>
        <View style={styles.cancel}>
          <Button action={onCancel} theme={ButtonThemes.Gray}>
            cancel
          </Button>
        </View>
      </View>
    </View>
  )
}

export default DiskPanelNameInput
