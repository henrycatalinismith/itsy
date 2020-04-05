import Pixlflip from "@highvalley.systems/pixlflip/regular"
import { navigate } from "@highvalley.systems/itsyhelp/store/location"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-search-exit.module.scss"

export interface HeaderSearchExitProps {
  navigate: (path: string) => void
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  navigate,
}

export function HeaderSearchExit({
  navigate,
}: HeaderSearchExitProps): React.ReactElement {
  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      navigate("/")
    },
    []
  )

  const button: React.ComponentProps<"button"> = {
    className: styles.component,
    onClick,
    type: "button",
  }

  return (
    <button {...button}>
      <Pixlflip fontSize={18}>back</Pixlflip>
    </button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchExit)
