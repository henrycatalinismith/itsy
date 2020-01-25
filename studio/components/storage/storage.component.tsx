import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import { selectStorageBusy } from "@itsy.studio/studio/store/storage"
import colors from "@itsy.studio/palettes/pico8/original.es6"

interface StorageProps {
  busy: boolean
}

const mapStateToProps = (state) => ({
  busy: selectStorageBusy(state),
})

const mapDispatchToProps = {}

export function Storage({ busy }: StorageProps): React.ReactElement {
  console.log({ busy })
  return (
    <View
      style={{
        width: 16,
        height: 16,
        backgroundColor: busy ? "white" : "transparent",
      }}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Storage)
