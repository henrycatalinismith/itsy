import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  Panel as _Panel,
  PanelModes,
  PanelVisibilities,
  selectVisiblePanels,
  selectPanelMode,
  selectPanels,
} from "@highvalley.systems/itsyexpo/store/panels"
import _ from "lodash"
import React from "react"
import { LayoutChangeEvent, LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel.module.scss"

interface PanelProps {
  visiblePanels: _Panel[]
  children: any
  id: string
  panel: _Panel
  panelMode: PanelModes
}

const mapStateToProps = (state, { id }) => ({
  visiblePanels: selectVisiblePanels(state),
  panel: selectPanels(state)[id],
  panelMode: selectPanelMode(state),
})

const mapDispatchToProps = {}

export function Panel({
  visiblePanels,
  children,
  panel,
  panelMode,
}: PanelProps) {
  const [layout, setLayout] = React.useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout)
  }, [])

  switch (panelMode) {
    case PanelModes.slide:
      return (
        <View style={[styles.slide, { width: 1024 }]}>
          <View style={[styles.inner, { width: 1024 - 8 }]} onLayout={onLayout}>
            <LayoutContext.Provider value={layout}>
              {children}
            </LayoutContext.Provider>
          </View>
        </View>
      )

    case PanelModes.tiles:
      const tileStyles = [styles.tile]

      if (panel.visibility === PanelVisibilities.Visible) {
        tileStyles.push({ flex: 1 })
      } else {
        tileStyles.push({ width: 0, display: "none" })
      }

      if (_.first(visiblePanels).id === panel.id) {
        tileStyles.push(styles.firstTile)
      }

      if (_.last(visiblePanels).id === panel.id) {
        tileStyles.push(styles.lastTile)
      }

      return (
        <View style={tileStyles}>
          <View style={[styles.inner]} onLayout={onLayout}>
            <LayoutContext.Provider value={layout}>
              {children}
            </LayoutContext.Provider>
          </View>
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
