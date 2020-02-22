import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"

import { selectStorageBusy } from "@itsy.studio/studio/store/storage"
import colors from "@highvalley.systems/palettes/pico8/original.es6"

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
        width: 24,
        height: 24,
        backgroundColor: busy ? "black" : "transparent",
      }}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Storage)
