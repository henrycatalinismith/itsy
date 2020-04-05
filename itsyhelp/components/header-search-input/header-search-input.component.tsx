import { search, selectQuery } from "@highvalley.systems/itsyhelp/store/query"
import React from "react"
import { connect } from "react-redux"
import styles from "./header-search-input.module.scss"

export interface HeaderSearchInputProps {
  query: string
  search: (query: string) => void
}

const mapStateToProps = (state) => ({
  query: selectQuery(state),
})

const mapDispatchToProps = {
  search,
}

export function HeaderSearchInput({
  query,
  search,
}: HeaderSearchInputProps): React.ReactElement {
  const element = React.useRef(undefined)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(element.current.value)
  }

  const onKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // onEnter()
    }
  }, [])

  const input: React.ComponentProps<"input"> = {
    autoCapitalize: "off",
    autoCorrect: "off",
    autoComplete: "off",
    autoFocus: true,
    className: styles.component,
    onChange,
    onKeyDown,
    spellCheck: false,
    type: "input",
    value: query,
  }

  return <input {...input} ref={element} />
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchInput)
