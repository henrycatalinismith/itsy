import LayoutContext from "@highvalley.systems/itsyexpo/contexts/layout"
import {
  Panel as _Panel,
  PanelModes,
  selectActivePanels,
  selectPanelMode,
  selectPanels,
} from "@highvalley.systems/itsyexpo/store/panels"
import { selectSafeArea } from "@highvalley.systems/itsyexpo/store/safe-area"
import { Rect } from "@highvalley.systems/typedefs/itsy"
import _ from "lodash"
import React from "react"
import { LayoutChangeEvent, LayoutRectangle, View } from "react-native"
import { connect } from "react-redux"
import styles from "./panel.module.scss"

interface PanelProps {
  activePanels: _Panel[]
  children: any
  id: string
  panel: _Panel
  panelMode: PanelModes
  safeArea: Rect
}

const mapStateToProps = (state, { id }) => ({
  activePanels: selectActivePanels(state),
  panel: selectPanels(state)[id],
  panelMode: selectPanelMode(state),
  safeArea: selectSafeArea(state),
})

const mapDispatchToProps = {}

export function Panel({
  activePanels,
  children,
  panel,
  panelMode,
  safeArea,
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
        <View style={[styles.slide, { width: safeArea.width }]}>
          <View
            style={[styles.inner, { width: safeArea.width - 8 }]}
            onLayout={onLayout}
          >
            <LayoutContext.Provider value={layout}>
              {children}
            </LayoutContext.Provider>
          </View>
        </View>
      )

    case PanelModes.tiles:
      const tileStyles = [styles.tile]

      if (panel.active) {
        tileStyles.push({ flex: 1 })
      } else {
        tileStyles.push({ width: 0, display: "none" })
      }

      if (_.first(activePanels).id === panel.id) {
        tileStyles.push(styles.firstTile)
      }

      if (_.last(activePanels).id === panel.id) {
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
