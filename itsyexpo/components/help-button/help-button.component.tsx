import Button, {
  ButtonThemes,
} from "@highvalley.systems/itsyexpo/components/button"
import { setHelpPanelPath } from "@highvalley.systems/itsyexpo/store/panels"
import React from "react"
import { connect } from "react-redux"

export interface HelpButtonProps {
  path: string
  setHelpPanelPath: (path: string) => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  setHelpPanelPath,
}

export function HelpButton({ path, setHelpPanelPath }: HelpButtonProps) {
  const action = React.useCallback(() => {
    setHelpPanelPath(path)
  }, [path])

  const button = {
    action,
    theme: ButtonThemes.Orange,
  }

  return <Button {...button}>help</Button>
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpButton)
