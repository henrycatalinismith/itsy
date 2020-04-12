import DiskPanelSubmode from "@highvalley.systems/itsyexpo/components/disk-panel-submode"
import { shareDisk } from "@highvalley.systems/itsyexpo/store/disks"
import React from "react"
import { connect } from "react-redux"
// import styles from "./disk-panel-mode-share.module.scss"

interface DiskPanelModeSpriteProps {
  shareDisk: () => void
}

const mapStateToProps = (state, { id }) => ({})

const mapDispatchToProps = {
  shareDisk,
}

export function DiskPanelModeSprite({ shareDisk }: DiskPanelModeSpriteProps) {
  React.useEffect(() => {
    shareDisk()
  }, [])

  return (
    <DiskPanelSubmode title="sharing...">
      <></>
    </DiskPanelSubmode>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskPanelModeSprite)
